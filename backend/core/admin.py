from django.contrib import admin
from .models import Client, Enrollment, Program

admin.site.register(Program)
admin.site.register(Client)
admin.site.register(Enrollment)
