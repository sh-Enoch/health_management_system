from ninja import NinjaAPI
from django.db import models
from .serializers import *
from core.models import Program, Client, Enrollment

api = NinjaAPI(
    version='1.0.0',
    docs_url="/docs/",
    title='Health Information System API',
    description='API for managing clients and health programs'
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


@api.post("/enrollments/", response=ClientEnrollment)
def create_enrollment(request, payload: EnrollmentIn):
    enrollment = Enrollment.objects.create(**payload.dict())
    return enrollment

@api.get("/clients/{client_id}/", response=ClientDetail)
def client_detail(request, client_id: int):
    client = Client.objects.prefetch_related(
        "enrollments__program"
    ).get(id=client_id)

    enrollments = [
        ClientEnrollment(
            id=enrollment.id,
            program=EnrollmentProgram(
                id=enrollment.program.id,
                name=enrollment.program.name,
            ),
            enrollment_date=enrollment.enrollment_date,
            active=enrollment.active,
        )
        for enrollment in client.enrollments.all()
    ]

    client_data = ClientDetail(
        id=client.id,
        first_name=client.first_name,
        last_name=client.last_name,
        date_of_birth=client.date_of_birth,
        gender=client.gender,
        phone_number=client.phone_number,
        created_at=client.created_at,
        updated_at=client.updated_at,
        enrollments=enrollments,
    )

    return client_data

@api.get("/enrollments/", response=List[ClientEnrollment])
def list_enrollments(request, client: int):
    qs = Enrollment.objects.filter(client_id=client).select_related('program')

    return [
        ClientEnrollment(
            id=enrollment.id,
            program=EnrollmentProgram(
                id=enrollment.program.id,
                name=enrollment.program.name,
            ),
            enrollment_date=enrollment.enrollment_date,
            active=enrollment.active,
        )
        for enrollment in qs
    ]
