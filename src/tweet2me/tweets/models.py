from django.db import models
from django.conf import settings
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save

User = settings.AUTH_USER_MODEL

# Create your models here.
class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey('Tweet', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class TweetSeen(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey('Tweet', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class TweetQuerySet(models.QuerySet):
    def feed(self, user):
        profile_exists = user.following.exists()
        followed_users_id = []
        if profile_exists:
            followed_users_id = user.following.values_list("user__id", flat=True) # [x.user.id for x in profiles]

        return self.filter(
            Q(user__id__in=followed_users_id) |
            Q(user=user)
            ).distinct().order_by('-timestamp')
    
    def feed_wseen(self, user):
        seen_tweets= get_user_model().objects.get(username=user.username).seen_user.values_list('id', flat=True)
        return self.feed(user).exclude(id__in = seen_tweets)


class TweetManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)

    def feed(self, user):
        return self.get_queryset().feed(user)
    
    def feed_wseen(self, user):
        return self.get_queryset().feed_wseen(user)

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    likes =models.ManyToManyField(User, related_name='tweet_user', blank=True, through=TweetLike)
    timestamp = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', null = True, on_delete=models.SET_NULL)
    seen = models.ManyToManyField(User, through=TweetSeen, blank=True, related_name='seen_user')

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.content

    objects = TweetManager()

    @property
    def is_retweet(self):
        return self.parent != None
