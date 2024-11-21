from django.contrib import admin
from django.urls import path
from .views import *

'''
Base ENDPONT api/tweets/
'''

urlpatterns=[
    path('', tweets_list_view, name='tweets_list'),
    path('feed/', tweets_feed_view),
    path('action/', tweet_action_view, name='tweet-action'),
    path('create/', tweet_create_view, name='create-tweet'),
    path('<int:tweet_id>/', tweet_detail_view, name='tweet'),
    path('<int:tweet_id>/delete/', tweet_delete_view, name='delete-tweet'),
    path('csrftoken/', get_csrf),
    path('hiddentweets/', test_seen),
    path('longpoll/global/', longpoll_view_global),
    path('longpoll/feed/', longpoll_view_feed)
]