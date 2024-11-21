from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver


from ..serializers import *
from ..models import *
from ..forms import *

# msg_queue = queue.SimpleQueue()
# @receiver(post_save, sender=Tweet)
# def add_msg(sender, instance, **kwargs):
#     print(instance)
#     msg_queue.put(instance)
# def tweets_generator():
#     msg_queue.empty()

@api_view(["POST"])
def longpoll_view_global(request, *args, **kwargs):
    gid = request.data.get('id')
    if gid ==None:
        return Response({}, status=400)
    gid = int(gid)
    qs = Tweet.objects.filter(id__gte = gid+1)
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)

@api_view(["POST"])
def longpoll_view_feed(request, *args, **kwargs):
    gid = request.data.get('id')
    print(gid)
    if gid ==None:
        return Response({}, status=400)
    gid = int(gid)
    qs = Tweet.objects.filter(id__gte = gid+1).feed_wseen(request.user)
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)



@api_view(['GET'])
@ensure_csrf_cookie
def get_csrf(request):
    print(request.COOKIES)
    response = Response({'detail': 'CSRF cookie set', "username" : f"{request.user.username}"}, status=200)
    response['X-CSRFToken'] = get_token(request)
    return response


@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs=Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj=qs.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)

@api_view(['DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    qs=Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this tweet"}, status=401)
    obj=qs.first()
    obj.delete()
    return Response({"message":"Tweet deleted"}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    '''
    id is required.
    Action options are like, unlike, retweet
    '''
    serializer = TweetActionSerializer(data = request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get('id')
        action = data.get('action')
        content = data.get('content')
        qs=Tweet.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)
        obj=qs.first()
        if action == 'like':
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            print(serializer.data.get('likes'))
            return Response({"likes" : serializer.data.get('likes')}, status=200)
        elif action == 'unlike':
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response({"likes" : serializer.data.get('likes')}, status=200)
        elif action == 'retweet':
            new_tweet = Tweet.objects.create(user=request.user, parent = obj, content=content)
            serializer = TweetSerializer(new_tweet)
            print(serializer.data)
            return Response(serializer.data, status=201)
        elif action == 'seen':
            obj.seen.add(request.user)
            return Response({"status" : "ok"}, status=200)
        elif action == 'unseen':
            obj.seen.remove(request.user)
            return Response({"status" : "ok"}, status=200)
    return Response({}, status=200)


@api_view(['GET'])
def tweets_list_view(request, *args, **kwargs):
    qs=Tweet.objects.all()
    seen_tweets = []
    username = request.GET.get('username')
    if request.user.username != '':
        seen_tweets= get_user_model().objects.get(username=request.user.username).seen_user.values_list('id', flat=True)
    if username != None:
        qs = qs.filter(user__username__iexact=username)
    return get_paginated_queryset_response(qs.exclude(id__in = seen_tweets), request)


@api_view(['POST']) #http method the clien == POST
#@permission_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)


def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = TweetSerializer(paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweets_feed_view(request, *args, **kwargs):
    user = request.user
    qs = Tweet.objects.feed_wseen(user)
    return get_paginated_queryset_response(qs, request) #Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def test_seen(request):
    seen_tweets = get_user_model().objects.get(id=request.user.id).seen_user.all()
    # serializer = TweetSerializer(seen_tweets, many=True)
    return get_paginated_queryset_response(seen_tweets, request)