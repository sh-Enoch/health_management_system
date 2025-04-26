from rest_framework import serializers
from .models import Program, Client, Enrollment

class ProgramSerializer(serializers.ModelSerializer):
    """Serializer for the Program model."""
    class Meta:
        model = Program
        fields = '__all__'  # Include all fields from the Program model

class ClientSerializer(serializers.ModelSerializer):
    """Serializer for the Client model."""
    class Meta:
        model = Client
        fields = '__all__'  # Include all fields from the Client model

class EnrollmentSerializer(serializers.ModelSerializer):
    """Serializer for the Enrollment model."""
    program = ProgramSerializer(read_only=True)  # Nested serializer for program details


    class Meta:
        model = Enrollment
        fields = '__all__'  # Include all fields from the Enrollment model

class ClientDetailSerializer(serializers.ModelSerializer):
    """Serializer for the Client model with nested enrollments."""
    enrollments = EnrollmentSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = '__all__'  # Include all fields from the Client model


class EnrollmentCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating model for Enrollment."""

    class Meta:
        model = Enrollment
        fields = ['client', 'program', 'enrollment_date']  # Include fields for creating an enrollment

