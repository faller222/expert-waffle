from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from .views import UsersView, UsersSecureView

urlpatterns = [
    path('', UsersView.as_view()),
    path('<str:username>', UsersSecureView.as_view()),
    path('auth/', obtain_auth_token),
    # path('/{username}/', views.Users.as_view()),
]
