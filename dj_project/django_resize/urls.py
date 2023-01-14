from django.urls import path
from . import views

urlpatterns = [
    path('', views.resizing_video)
]
