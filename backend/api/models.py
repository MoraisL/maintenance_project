from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils.timezone import localtime

class Machine(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=100)
    local = models.CharField(max_length=200)
    fab_date = models.DateField()
    serial_number = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('todo_app:machine_detail', kwargs={'machine_id': self.id})


class MachineHistory(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name="history")
    date = models.DateTimeField(auto_now_add=True)
    description = models.TextField()

    def __str__(self):
        return f"{self.machine.name} - {self.date}"


class Team(models.Model):
    name = models.CharField(max_length=100)
    leader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='leader_of')
    members = models.ManyToManyField(User, related_name='teams')

    def __str__(self):
        return self.name


class Maintenance(models.Model):
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.CharField(max_length=50)  
    description = models.TextField()
    priority = models.CharField(max_length=50) 
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="maintenances")

    def __str__(self):
        return f"Maintenance on {self.machine.name} - {self.date}"

    def get_absolute_url(self):
        return reverse('todo_app:maintenance_detail', kwargs={'maintenance_id': self.id})

    class Meta:
        ordering = ('-date',)

    def formatted_date(self):
        return localtime(self.date).strftime('%Y-%m-%d %H:%M')


class Part(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=100, unique=True)
    supplier = models.CharField(max_length=200)
    qtd_in_stock = models.IntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} ({self.code})"

    def adjust_stock(self, qtd_change):
        self.qtd_in_stock += qtd_change
        self.save()


class UsedPart(models.Model):
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    qtd = models.IntegerField()
    maintenance = models.ForeignKey(Maintenance, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.qtd} x {self.part.name} used in {self.maintenance}"


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Profile for {self.user.username}"

    def get_absolute_url(self):
        return reverse('todo_app:profile', kwargs={'profile_id': self.id})
