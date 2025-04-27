from django.test import TestCase
from ninja.testing import TestClient
from core.models import Program, Client
from .views import api  # Import your actual API instance

class ProgramAPITest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.program_data = {"name": "HIV", "description": "Test"}
        cls.client = TestClient(api)  # Create client per test class

    def test_create_program(self):
        response = self.client.post("/api/v1/programs/", json=self.program_data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Program.objects.count(), 1)

    def test_list_programs(self):
        Program.objects.create(**self.program_data)
        response = self.client.get("/api/v1/programs/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

class ClientAPITest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client_data = {
            "first_name": "John",
            "last_name": "Doe",
            "date_of_birth": "1990-01-01",
            "gender": "M",
            "phone_number": ""
        }
        cls.client = TestClient(api)

    def test_create_client(self):
        response = self.client.post("/api/v1/clients/", json=self.client_data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Client.objects.count(), 1)