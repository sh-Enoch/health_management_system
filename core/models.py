from django.db import models
from django.core.validators import MinLengthValidator
# Create your models here.


class Program(models.Model):
    """Program model to store program details."""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """String representation of the Program model."""
        return self.name
    
class Client(models.Model):
    """Defines a client model to store client information."""
    GENDER_CHOICES= [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    first_name =models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, Choices=GENDER_CHOICES)
    phone_number = models.IntegerField(validators=[MinLengthValidator(10)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('first_name', 'last_name', 'date_of_birth')

    def __str__(self):
        """String representation of the Client model."""
        return f"{self.first_name} {self.last_name}"


class Enrollment(models.Model):
    """Enrollment model to store enrollment details."""
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='enrollments')
    program = models.ForeignKey(Program, on_delete=models.CASCADE)
    enrollment_date = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('client', 'program')

    def __str__(self):
        """String representation of the Enrollment model."""
        return f"{self.client} in {self.program}"