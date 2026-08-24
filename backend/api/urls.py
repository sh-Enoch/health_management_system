from django.urls import path
from .views import api

urlpatterns = [
    path("", api.urls),  # All @api decorated endpoints get collected here
]