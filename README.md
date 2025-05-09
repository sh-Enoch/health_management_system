﻿# Health Management System API

![Django](https://img.shields.io/badge/Django-3.2-green)
![Django Ninja](https://img.shields.io/badge/Django_Ninja-0.22-blue)
![Python](https://img.shields.io/badge/Python-3.11-yellow)

A RESTful API for managing health programs and client enrollments, built with Django Ninja following API-first design principles.

## Features

- **Program Management**:
  - Create TB, Malaria, HIV, etc. health programs
  - List all available programs
- **Client Management**:
  - Register new clients
  - Search clients by name
  - View client details with enrollment history
- **Enrollment System**:
  - Enroll clients in health programs
  - Track enrollment dates and status

Create and activate virtual environment:
    bash
    python -m venv venv
    source venv/bin/activate  # Linux/Mac
    venv\Scripts\activate     # Windows

pip install -r requirements.txt

Important docs
 
 <a href="https://docs.google.com/presentation/d/1l1jCNpI5fTQT2bq9M761fBEnpRE59P6N/edit?usp=drivesdk&ouid=113480002542034545958&rtpof=true&sd=true"> Link to presentation </a>