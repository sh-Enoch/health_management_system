from ninja import ModelSchema, Schema
from typing import List, Optional
from core.models import Program, Client, Enrollment
from datetime import date, datetime

# --- Program Schemas ---
class ProgramCreate(Schema):
    name: str
    description: Optional[str] = None

class ProgramOut(ModelSchema):
    class Config:
        model = Program
        model_fields = ['id', 'name', 'description', 'created_at', 'updated_at']

# --- Client Schemas ---
class ClientCreate(Schema):
    first_name: str
    last_name: str
    date_of_birth: date
    gender: str
    phone_number: Optional[str] = None

class ClientOut(ModelSchema):
    class Config:
        model = Client
        model_fields = ['id', 'first_name', 'last_name', 'date_of_birth', 
                       'gender', 'phone_number', 'created_at', 'updated_at']

# --- Enrollment Schemas ---
class EnrollmentBriefOut(ModelSchema):
    program_name: str = None  # Will be populated in custom resolver
    
    class Config:
        model = Enrollment
        model_fields = ['id', 'enrollment_date', 'active']
        
    def resolve_program_name(self, obj):
        return obj.program.name if obj.program else None

class ClientDetailOut(ClientOut):
    enrollments: List[EnrollmentBriefOut] = []
    
    def resolve_enrollments(self, obj):
        return obj.enrollments.all()

class EnrollmentCreate(Schema):
    client_id: int
    program_id: int

class EnrollmentOut(ModelSchema):
    client_name: str = None
    program_name: str = None
    
    class Config:
        model = Enrollment
        model_fields = ['id', 'enrollment_date', 'active', 'created_at', 'updated_at']
    
    def resolve_client_name(self, obj):
        return f"{obj.client.first_name} {obj.client.last_name}" if obj.client else None
        
    def resolve_program_name(self, obj):
        return obj.program.name if obj.program else None