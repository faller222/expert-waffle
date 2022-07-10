from django.contrib.auth.models import User
from django.db import models


class Diagnosis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    data = models.JSONField()
    datetime = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.data
