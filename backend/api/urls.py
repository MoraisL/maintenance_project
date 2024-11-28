from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenRefreshView 


router = DefaultRouter()
router.register(r'machines', views.MachineViewSet)
router.register(r'maintenances', views.MaintenanceViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'parts', views.PartViewSet)
router.register(r'usedparts', views.UsedPartViewSet)
router.register(r'profiles', views.ProfileViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterUserView.as_view(), name='register_user'),
]