from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.authentication import BearerAuthentication

from . import priaid


@api_view(['GET'])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated])
def auth_view(request, format=None):
    """Auth Testing purposes"""
    return Response(priaid.auth())


@api_view(['GET'])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated])
def get_symptoms_view(request, format=None):
    return Response(priaid.get_symptoms())


@api_view(['GET'])
@authentication_classes([BearerAuthentication])
@permission_classes([IsAuthenticated])
def get_diagnosis_view(request, format=None):
    symptoms = request.query_params.get('symptoms')[1:-1].split(',')
    gender = request.query_params.get('gender')
    year_of_birth = request.query_params.get('year_of_birth')
    return Response(priaid.get_diagnosis(symptoms, gender, year_of_birth))
