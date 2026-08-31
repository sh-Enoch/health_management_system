from ninja import ModelSchema, Schema
from typing import List, Optional, Literal
from datetime import date
from pydantic import field_validator
from core.models import Program, Client, Enrollment

class ProgramIn(Schema):
    name: str
    description: Optional[str] = None

class ProgramOut(ModelSchema):
    class Meta:
        model = Program
        db_table = 'Program'
        managed = True
        verbose_name = 'ModelName'
        verbose_name_plural = 'ModelNames'
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']

class ClientIn(Schema):
    first_name: str
    last_name: str
    date_of_birth: date
    gender: str
    phone_number: Optional[str] = None

class ClientOut(ModelSchema):
    gender: str

    @field_validator('gender', mode='before')
    @classmethod
    def normalize_gender(cls, v):
        # Map display names to codes
        mapping = {'male': 'M', 'Male': 'M', 'female': 'F', 'Female': 'F', 'other': 'O', 'Other': 'O'}
        return mapping.get(v, v)

    class Meta:
        model = Client
        db_table = 'Client'
        managed = True
        verbose_name = 'ModelName'
        verbose_name_plural = 'ModelNames'
        fields = ['id', 'first_name', 'last_name', 'date_of_birth','gender', 'phone_number', 'created_at', 'updated_at']
        
class EnrollmentProgram(Schema):
    id: int
    name: str

class ClientEnrollment(Schema):
    id: int
    program: EnrollmentProgram
    enrollment_date: date
    active: bool

class ClientDetail(ClientOut):
    enrollments: List[ClientEnrollment] = []
    
    def resolve_enrollments(self, obj):
        return obj.enrollments.select_related('program').all()

class EnrollmentIn(Schema):
    client_id: int
    program_id: int
    enrollment_date: Optional[date] = None
    active: Optional[bool] = True