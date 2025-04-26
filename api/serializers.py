from rest_framework import serializers
from ..core.models import Program, Client, Enrollment


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']


# --- Client Serializers ---

class ClientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['first_name', 'last_name', 'date_of_birth', 'gender', 'phone_number']

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'phone_number', 'created_at', 'updated_at']

class EnrollmentBriefSerializer(serializers.ModelSerializer):
    """Used for nested enrollments inside ClientDetail"""
    program = serializers.StringRelatedField()

    class Meta:
        model = Enrollment
        fields = ['id', 'program', 'enrollment_date', 'active']


class ClientDetailSerializer(serializers.ModelSerializer):
    enrollments = EnrollmentBriefSerializer(many=True, read_only=True)

    class Meta:
        model = Client
        fields = ['id', 'first_name', 'last_name', 'date_of_birth', 'gender', 'phone_number', 'enrollments', 'created_at', 'updated_at']


# --- Enrollment Serializers ---

class EnrollmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['client', 'program']

class EnrollmentSerializer(serializers.ModelSerializer):
    client = serializers.StringRelatedField()
    program = serializers.StringRelatedField()

    class Meta:
        model = Enrollment
        fields = ['id', 'client', 'program', 'enrollment_date', 'active', 'created_at', 'updated_at']