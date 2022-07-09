from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth.models import User

from .serializers import UserFullSerializer
from .authentication import BearerAuthentication


class UsersView(APIView):

    def post(self, request, format=None):
        data = JSONParser().parse(request)
        try:

            user = User.objects.create_user(username=data['username'],
                                            email=data['email'],
                                            password=data['password'],
                                            first_name=data['first_name'],
                                            last_name=data['last_name'])
            serial = UserFullSerializer(user)
            return Response(serial.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response('Error', status=status.HTTP_400_BAD_REQUEST)


class UsersSecureView(APIView):
    authentication_classes = [BearerAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, username, format=None):
        user = request.user

        if username == user.username:
            data = JSONParser().parse(request)
            if "password" in data:
                user.set_password(data["password"])
            if "first_name" in data:
                user.first_name = data["first_name"]
            if "last_name" in data:
                user.last_name = data["last_name"]

            user.save()
            serial = UserFullSerializer(user)
            return Response(serial.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response("You can't update a different user than the authenticated.",
                            status=status.HTTP_401_UNAUTHORIZED)
