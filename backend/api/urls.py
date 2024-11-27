from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'machines', views.MachineViewSet)
router.register(r'maintenances', views.MaintenanceViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'parts', views.PartViewSet)
router.register(r'usedparts', views.UsedPartViewSet)
router.register(r'profiles', views.ProfileViewSet)



urlpatterns = [
    path('', include(router.urls)),
]