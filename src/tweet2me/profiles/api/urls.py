from django.urls import path
from .views import *
'''
CLIENT
Base ENDPOINT api/profiles/
'''

urlpatterns = [
    path('edit/', profile_update_view),
    path('<str:username>/', profile_detail_api_view),
    path('<str:username>/follow/', profile_detail_api_view),
]
