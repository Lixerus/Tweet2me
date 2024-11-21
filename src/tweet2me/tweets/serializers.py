from rest_framework import serializers
from .models import Tweet
from .forms import MAX_TWEET_LENGTH
from profiles.serializers import PublicProfileSerilaizer

TWEET_ACTION_OPTIONS = ['like', 'unlike', 'retweet', 'seen', 'unseen']


class TweetCreateSerializer(serializers.ModelSerializer):
    user = PublicProfileSerilaizer(source='user.profile', read_only=True)  #serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Tweet
        fields = [
            'user', 
            'id',
            'content',
            'likes', 
            'is_retweet',
            'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()

    def get_user(self, obj):
        return obj.user.id

    def validate_content(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value
    

class TweetSerializer(serializers.ModelSerializer):
    user =  PublicProfileSerilaizer(source='user.profile', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = [
            'user',
            'id',
            'content',
            'likes',
            'is_retweet',
            'parent',
            'seen',
            'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action for tweet")
        return value