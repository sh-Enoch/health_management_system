from cmath import pi

from ninja import NinjaAPI
from django.db import models
from typing import List

from core.models import Program, Client, Enrollment
from .schemas import (
    ClientDetail,
    ClientEnrollment,
    ClientIn,
    ClientOut,
    EnrollmentIn,
    ProgramIn,
    ProgramOut,
)

api = NinjaAPI(
    version='1.0.0',
    docs_url="/docs/",
    title='Health Information System API',
    description='API for managing clients and health programs currently'
)

@api.post("/programs/", response=ProgramOut)
def create_program(request, payload: ProgramIn):
    program = Program.objects.create(**payload.dict())
    return program

@api.get("/programs/", response=List[ProgramOut])
def list_programs(request, search: str = None):
    qs = Program.objects.all()
    if search:
        qs = qs.filter(name__icontains=search)
    return qs

@api.post("/clients/", response=ClientOut)
def create_client(request, payload: ClientIn):
    client = Client.objects.create(**payload.dict())
    return client

@api.get("/clients/", response=List[ClientOut])
def list_clients(request, search: str = None):
    qs = Client.objects.all()
    if search:
        qs = qs.filter(
            models.Q(first_name__icontains=search) |
            models.Q(last_name__icontains=search)
        )
    return qs

@api.get("/clients/{client_id}/", response=ClientDetail)
def client_detail(request, client_id: int):
    return Client.objects.get(id=client_id)

@api.post("/enrollments/", response=ClientEnrollment)
def create_enrollment(request, payload: EnrollmentIn):
    enrollment = Enrollment.objects.create(**payload.dict())
    return enrollment


@pi.get("/enrollments/", response=List[ClientEnrollment])
def list_enrollments(request, client_id: int = None):
    qs = Enrollment.objects.all()
    if client_id:
        qs = qs.filter(client_id=client_id)
    return qs