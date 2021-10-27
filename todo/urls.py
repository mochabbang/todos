from django.urls import path
from .views import *

urlpatterns = [
    path('status_check/', status_check, name='status_check'),
]