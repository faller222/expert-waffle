from rest_framework import status
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from users.authentication import BearerAuthentication
from .models import Diagnosis


def _touch(diagnosis: Diagnosis):
    data = diagnosis.data
    data['_datetime'] = diagnosis.datetime
    return data


class DiagnosisView(APIView):
    authentication_classes = [BearerAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        result_set = Diagnosis.objects.filter(user=user)

        return Response(map(_touch, result_set), status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = request.user
        data = JSONParser().parse(request)

        d = Diagnosis(user=user, data=data)
        d.save()

        return Response("Created", status=status.HTTP_201_CREATED)
