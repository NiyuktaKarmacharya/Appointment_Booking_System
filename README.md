Appointment Booking System

A full-stack salon appointment booking system built with React and Django REST Framework.

Tech Stack

Frontend

React + TypeScript
Tailwind CSS
React Hook Form
TanStack Query
Axios

Backend

Python
Django REST Framework
SQLite
Features
Service CRUD
Book appointments
View appointments
Update appointment status
Delete appointments
Form validation
Prevent duplicate bookings for the same service, date, and time

Project Structure
Appointment_Booking/
├── backend/
└── frontend/

Setup
Backend
cd backend

python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Backend runs at:

http://localhost:8000

Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
