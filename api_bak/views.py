from django.shortcuts import render
from rest_framework import  generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from core .models import Program, Client, Enrollment
from  api.schemas import (
    ProgramSerializer,
    ClientSerializer,
    EnrollmentSerializer,
    ClientDetailSerializer,
    EnrollmentCreateSerializer
)

from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


# Create your views here.
class ProgramListCreateView(generics.ListCreateAPIView):
    """View to list and create programs."""
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class ClientListView(generics.ListAPIView):
    """List all clients."""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name']

class ClientCreateView(generics.CreateAPIView):
    """Create a new client."""
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a client."""
    queryset = Client.objects.all()
    serializer_class = ClientDetailSerializer
    lookup_field = 'id'  # Use 'id' as the lookup field instead of 'pk'

class EnrollmentCreateView(generics.CreateAPIView):
    """Create a new enrollment."""
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentCreateSerializer

    
    @swagger_auto_schema(
        request_body=EnrollmentCreateSerializer,
        responses={201: 'Enrollment created', 400: 'Invalid input data'}
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

@api_view(['GET'])
def client_search(request):
    """Search for clients by first or last name."""
    search_term = request.query_params.get('search', '')
    clients = Client.objects.filter(
        models.Q(first_name__icontains=search_term) |
        models.Q(last_name__icontains=search_term)
    )[:10]
    serializer = ClientSerializer(clients, many=True)
    return Response(serializer.data)
