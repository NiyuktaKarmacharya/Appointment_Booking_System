from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Appointment
from .serializers import AppointmentSerializer


@api_view(["GET", "POST"])
def appointment_list(request):

    if request.method == "GET":
        appointments = Appointment.objects.select_related("service").all()
        serializer = AppointmentSerializer(appointments,many=True)
        return Response(serializer.data)
    
    if request.method == "POST":
        serializer = AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(["PATCH"])
def appointment_status(request, pk):
    try:
        appointment = Appointment.objects.get(pk=pk)
    except Appointment.DoesNotExist:
        return Response({"detail": "Appointment not found."},status=status.HTTP_404_NOT_FOUND)
    new_status = request.data.get("status")
    valid_statuses = [
        Appointment.Status.PENDING,
        Appointment.Status.CONFIRMED,
        Appointment.Status.COMPLETED,
        Appointment.Status.CANCELLED,
    ]
    if new_status not in valid_statuses:
        return Response({"status": ["Invalid status."]},status=status.HTTP_400_BAD_REQUEST)
    appointment.status = new_status
    appointment.save()
    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data)

@api_view(["DELETE"])
def appointment_delete(request, pk):

    try:
        appointment = Appointment.objects.get(pk=pk)

    except Appointment.DoesNotExist:
        return Response({"detail": "Appointment not found."},status=status.HTTP_404_NOT_FOUND)
    appointment.delete()
    return Response({"detail": "Appointment deleted successfully."},status=status.HTTP_204_NO_CONTENT)