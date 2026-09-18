from rest_framework import serializers
from .models import Appointment
from services.serializers import ServiceSerializer


class AppointmentSerializer(serializers.ModelSerializer):
    service_details = ServiceSerializer(source="service", read_only=True)
    class Meta:
        model = Appointment
        fields = ["id","name","phone_number","service","service_details","date","time","notes","status","created_at",]
        read_only_fields = ["id", "status", "created_at","service_details"]

    def validate(self, data):
        service = data.get("service")
        date = data.get("date")
        time = data.get("time")
        if Appointment.objects.filter(service=service,date=date,time=time,).exists():
            raise serializers.ValidationError("This service is already booked at this date and time.")
        return data