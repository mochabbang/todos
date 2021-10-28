from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'todo', TodoModelViewSet)

urlpatterns = [
    path('status_check/', status_check, name='status_check'),
    path('',include(router.urls)),
]