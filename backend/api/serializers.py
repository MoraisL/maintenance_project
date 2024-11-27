from rest_framework import serializers
from .models import Machine, Maintenance, Team, Part, UsedPart, Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'

class MaintenanceSerializer(serializers.ModelSerializer):
    machine = MachineSerializer() # Nested serializer for related machine
    user = UserSerializer()
    formatted_date = serializers.CharField(source='formatted_date', read_only=True)

    class Meta:
        model = Maintenance
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    leader = UserSerializer()

    class Meta:
        model = Team
        fields = '__all__'


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = '__all__'


class UsedPartSerializer(serializers.ModelSerializer):
    part = PartSerializer()
    maintenance = MaintenanceSerializer()

    class Meta:
        model = UsedPart
        fields = '__all__'



class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'