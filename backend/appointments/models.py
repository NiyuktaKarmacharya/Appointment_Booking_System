from django.db import models
from services.models import Service
# Create your models here.
class Appointment(models.Model):
    class Status(models.TextChoices):
        PENDING = 'Pending'
        CONFIRMED = 'Confirmed'
        COMPLETED = 'Completed'
        CANCELLED = 'Cancelled'

    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created_at']