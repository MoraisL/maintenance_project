from rest_framework import serializers
from .models import Machine, Maintenance, Team, Part, UsedPart, Profile
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    # Usando PrimaryKeyRelatedField para aceitar apenas o id do líder e dos membros
    leader = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    members = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'leader', 'members']

class MaintenanceSerializer(serializers.ModelSerializer):
    # Modificando para incluir o primeiro nome e sobrenome do usuário
    user = serializers.SerializerMethodField()
    machine = MachineSerializer()
    team = TeamSerializer()

    formatted_date = serializers.CharField(read_only=True)

    class Meta:
        model = Maintenance
        fields = ['id', 'machine', 'team', 'user', 'formatted_date', 'status', 'priority', 'description']

    def get_user(self, obj):
        # Retorna o nome completo do usuário (primeiro e sobrenome)
        user = obj.user
        return f"{user.username}" if user else None


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