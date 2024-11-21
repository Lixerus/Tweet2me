from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from ..models import Profile
from django.contrib.auth import get_user_model
from  ..serializers import PublicProfileSerilaizer, ProfileInfoSerializer

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view(['GET', 'POST']) 
@permission_classes([IsAuthenticatedOrReadOnly])
def profile_detail_api_view(request, username, *args, **kwargs):
    #get the profile for the passed username
    print("IMHERE")
    print(username)
    qs = Profile.objects.filter(user__username = username)
    if not qs.exists():
        return Response({"detail" : "User not found"}, status=404)
    profile_obj = qs.first()
    data = request.data or {}
    if request.method == "POST":
        me = request.user
        action = data.get('action')
        if profile_obj.user != me:
            if action == 'follow':
                profile_obj.followers.add(me)
            elif action == 'unfollow':
                profile_obj.followers.remove(me)
            else:
                pass
    serializer = PublicProfileSerilaizer(instance = profile_obj, context = {"request" : request})
    return Response(serializer.data, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile_action_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username = username)
    if not qs.exists():
        return Response({"detail" : "User not found"}, status=404)
    profile_obj = qs.first()
    data = request.data
    me = request.user
    action = data.get('action')
    if profile_obj.user != me:
        if action == 'follow':
            profile_obj.followers.add(me)
        elif action == 'unfollow':
            profile_obj.followers.remove(me)
        else:
            pass
    serializer = PublicProfileSerilaizer(instance = profile_obj, context = {"request" : request})
    return Response({"is_following" : serializer.data.get('is_following')}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profile_update_view(request, *args, **kwargs):
    profile = request.user.profile
    serializer = ProfileInfoSerializer(profile, data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = request.user
        if user.username != serializer.validated_data['username']:
            return Response({"status" : "credentials mismatch"}, status=400)
        user.first_name = serializer.validated_data['first_name']
        user.last_name = serializer.validated_data['last_name']
        user.email = serializer.validated_data['email']
        user.save()
        serializer.save()
        return Response(serializer.data, status=201)
