from rest_framework import serializers

from .models import Profile
from accounts.serializers import User_serializer

class PublicProfileSerilaizer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    follower_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = [
            'first_name',
            'last_name',
            'bio',
            'id',
            'location',
            'follower_count',
            'following_count',
            'is_following',
            'username',
            'email'
        ]

    def get_is_following(self, obj):
        is_following = False
        context = self.context
        request = context.get('request')
        if request:
            user = request.user
            is_following = user in obj.followers.all()
        return is_following

    def get_first_name(self,obj):
        return obj.user.first_name

    def get_last_name(self,obj):
        return obj.user.last_name

    def get_username(self,obj):
        return obj.user.username

    def get_following_count(self,obj):
        return obj.user.following.count()

    def get_follower_count(self,obj):
        return obj.followers.count()
    
    def get_email(self, obj):
        return obj.user.email
    
class ProfileInfoSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    last_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    username = serializers.CharField(max_length=150, required=True)

    class Meta:
        model = Profile
        fields = ['location', 'bio', 'email', 'first_name', 'last_name', 'username']
