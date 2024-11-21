from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from django.utils.html import escape


@api_view(["POST"])
def login_view(request):
    serializer = Login_user_serializer(data=request.data or None)
    serializer.is_valid(raise_exception=True)
    user = authenticate(username=serializer.validated_data["username"], password = serializer.validated_data["password"])
    if user == None:
        return Response({"status" : "Account doesnt exist"}, status=400)
    login(request, user, backend='django.contrib.auth.backends.ModelBackend')
    return Response({'status' : "ok"}, status=200)

@api_view(["POST"])
def logout_view(request, *args, **kwargs):
    logout(request)
    return Response({"status" : "ok"}, status=200)

@api_view(["POST"])
def register_view(request, *args, **kwargs):
    serializer = User_serializer(data=request.data or None)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    login(request, user, backend='django.contrib.auth.backends.ModelBackend')
    return Response({'status' : "ok"}, status=200)


def oauth2_view(request):
    return render(request,'accounts/auth.html')
