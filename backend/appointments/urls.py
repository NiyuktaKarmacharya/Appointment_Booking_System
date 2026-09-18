from django.urls import path
from .views import appointment_list, appointment_status,appointment_delete

urlpatterns = [
    path('appointments/', appointment_list, name='appointment-list'),
    path('appointments/<int:pk>/status/', appointment_status, name='appointment-status'),
    path('appointments/delete/<int:pk>/', appointment_delete, name='appointment-delete'),
]