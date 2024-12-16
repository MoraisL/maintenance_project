from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Machine, Maintenance, Team, Part, UsedPart, Profile
from .serializers import MachineSerializer, MaintenanceSerializer, TeamSerializer, PartSerializer, UsedPartSerializer, ProfileSerializer, MyTokenObtainPairSerializer, UserSerializer

class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({"error": "Todos os campos são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Usuário já existe."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({"message": "Usuário registrado com sucesso!"}, status=status.HTTP_201_CREATED)
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    permission_classes = [permissions.IsAuthenticated]  # Protege todas as ações


class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Recuperando o ID da máquina diretamente da URL (capturado no path da URL)
        machine_id = self.kwargs.get('machine_id')

        # Verificando se o ID da máquina foi fornecido na URL
        if machine_id:
            # Filtra as manutenções para a máquina selecionada
            queryset = Maintenance.objects.filter(machine_id=machine_id)
        else:
            queryset = Maintenance.objects.all()

        return queryset

    def perform_create(self, serializer):
        # Salva a manutenção com o usuário autenticado como responsável
        serializer.save(user=self.request.user)





class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]


class PartViewSet(viewsets.ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer
    permission_classes = [permissions.IsAuthenticated]


class UsedPartViewSet(viewsets.ModelViewSet):
    queryset = UsedPart.objects.all()
    serializer_class = UsedPartSerializer
    permission_classes = [permissions.IsAuthenticated]

class PartViewSet(viewsets.ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'])
    def adjust_quantity(self, request, pk=None):
        part = self.get_object()
        tipo = request.data.get('tipo')
        quantidade = int(request.data.get('quantidade', 0))

        if tipo == 'entrada':
            part.adjust_stock(quantidade)
        elif tipo == 'saida':
            if part.qtd >= quantidade:
                part.adjust_stock(-quantidade)
            else:
                return Response({"error": "Quantidade insuficiente"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Estoque atualizado com sucesso!"}, status=status.HTTP_200_OK)
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user) # Somente o perfil do usuário logado
    
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]