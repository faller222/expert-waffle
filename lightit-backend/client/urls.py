from django.urls import path

from . import views

urlpatterns = [
    path('auth', views.auth_view),
    path('symptoms', views.get_symptoms_view),
    path('diagnosis', views.get_diagnosis_view),
]
