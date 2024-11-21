"""tweet2me URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView

from accounts.views import *

from tweets.views import *

urlpatterns = [
    # path('/', back_view, name='home'),
    path('', RedirectView.as_view(url='http://localhost:3000/')),
    path('admin/', admin.site.urls),
    path('api/profile/', include('profiles.api.urls')),
    path('api/tweets/', include('tweets.api.urls')),
    path('global/', tweets_list_view),
    path('<int:tweet_id>', tweets_detail_view),
    path('login/', login_view),
    path('logout/', logout_view),
    path('register/',register_view),
    path('oauth/', oauth2_view),
    url('', include('social_django.urls', namespace='social'))

]

if settings.DEBUG:
    urlpatterns+= static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)