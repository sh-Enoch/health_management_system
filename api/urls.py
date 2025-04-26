from django.urls import path
from .views import api  # Import the NinjaAPI instance

urlpatterns = [
    path("", api.urls),  # All endpoints are auto-registered
]