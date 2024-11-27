from rest_framework import viewsets, permissions
from .models import Machine, Maintenance, Team, Part, UsedPart, Profile
from .serializers import MachineSerializer, MaintenanceSerializer, TeamSerializer, PartSerializer, UsedPartSerializer, ProfileSerializer


class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer



class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer




class PartViewSet(viewsets.ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer





class UsedPartViewSet(viewsets.ModelViewSet):
    queryset = UsedPart.objects.all()
    serializer_class = UsedPartSerializer




class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
