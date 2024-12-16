from datetime import datetime
from rest_framework import serializers
from .models import Machine, Maintenance, Team, Part, UsedPart, Profile
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils.timezone import localtime

class MyTokenObtainPairSerializer(TokenObtainPairSerializer): # Para customizar o token (opcional)
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username  # Adiciona o username ao token
        return token



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']




class TeamSerializer(serializers.ModelSerializer):
    # Usando PrimaryKeyRelatedField para aceitar apenas o id do líder e dos membros
    leader = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'leader', 'members']

class MaintenanceSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    machine = serializers.PrimaryKeyRelatedField(queryset=Machine.objects.all())
    team = serializers.PrimaryKeyRelatedField(queryset=Team.objects.all())  # Modificação aqui
    formatted_date = serializers.SerializerMethodField()

    class Meta:
        model = Maintenance
        fields = ['id', 'machine', 'team', 'user', 'formatted_date', 'date', 'status', 'priority', 'description']

    def validate_date(self, value):
        if isinstance(value, datetime):  # Verifica se o valor já é um datetime
            return value
        try:
            return datetime.strptime(value, "%Y-%m-%dT%H:%M:%S")  # Formato ISO 8601
        except ValueError:
            raise serializers.ValidationError("Formato de data inválido. Use o formato ISO 8601.")

    
    def get_user(self, obj):
        return f"{obj.user.username}" if obj.user else None

    def get_machine(self, obj):
        return {
            "id": obj.machine.id,
            "name": obj.machine.name,
            "type": obj.machine.type,
            "local": obj.machine.local,
        }

    def get_team(self, obj):
        return {
            "id": obj.team.id,
            "name": obj.team.name,
            "leader": obj.team.leader.username if obj.team.leader else None,
        }

    def get_formatted_date(self, obj):
        return localtime(obj.date).strftime('%d/%m/%Y %H:%M') if obj.date else "N/A"


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = '__all__'

class MachineSerializer(serializers.ModelSerializer):
    history = MaintenanceSerializer(many=True)  # Adiciona a lista de manutenções associadas à máquina

    class Meta:
        model = Machine
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