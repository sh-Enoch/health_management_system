from ninja import ModelSchema, Schema
from typing import List, Optional
from datetime import date
from core.models import Program, Client, Enrollment

class ProgramIn(Schema):
    name: str
    description: Optional[str] = None

class ProgramOut(ModelSchema):
    class Config:
        model = Program
        model_fields = ['id', 'name', 'description', 'created_at', 'updated_at']

class ClientIn(Schema):
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
    

class EnrollmentIn(Schema):
    client_id: int
    program_id: int
    enrollment_date: Optional[date] = None
    active: Optional[bool] = True