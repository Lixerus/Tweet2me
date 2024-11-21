from rest_framework import authentication
from django.contrib.auth import get_user_model

User = get_user_model()

class DevAuthenication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.filter(id=1)
        user = qs.order_by('id').first()
        return(user, None)