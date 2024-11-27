from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils.timezone import localtime

class Machine(models.Model):
    """
    Represents a machine that requires maintenance.

    Fields:
        name (CharField): Name of the machine.
        type (CharField): Type of the machine.
        local (CharField): Location of the machine.
        fab_date (DateField): Manufacturing date of the machine.
        serial_number (CharField): Serial number of the machine.
    """
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=100)
    local = models.CharField(max_length=200)
    fab_date = models.DateField()
    serial_number = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        """Returns the URL to access a particular machine instance."""
        return reverse('todo_app:machine_detail', kwargs={'machine_id': self.id})


class Maintenance(models.Model):
    """
    Represents a maintenance task performed on a machine.

    Fields:
        machine (ForeignKey): The machine this maintenance relates to.
        date (DateTimeField): Date and time the maintenance was performed.
        status (CharField): Status of the maintenance (e.g., 'Pending', 'Completed').
        description (TextField): Description of the maintenance performed.
        priority (CharField): Priority level of the maintenance.
        user (ForeignKey): User responsible for the maintenance.
        category (ForeignKey): Category of maintenance task. 
    """
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
    date = models.DateTimeField()
    status = models.CharField(max_length=50)  
    description = models.TextField()
    priority = models.CharField(max_length=50) 
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Maintenance on {self.machine.name} - {self.date}"

    def get_absolute_url(self):
        """Returns the URL to access a particular maintenance instance."""
        return reverse('todo_app:maintenance_detail', kwargs={'maintenance_id': self.id}) # Assuming you'll create this URL

    class Meta:
        ordering = ('-date',) # Ordered by date descending


    def formatted_date(self):
        """Returns the formatted date of the maintenance."""
        return localtime(self.date).strftime('%Y-%m-%d %H:%M')




class Team(models.Model):
    """
    Represents a team of maintenance personnel.

    Fields:
        name (CharField): Name of the team.
        leader (ForeignKey): User who is the leader of the team.
    """
    name = models.CharField(max_length=100)
    leader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='leader_of') # Allows leader to be null

    def __str__(self):
        return self.name


class Part(models.Model):
    """
    Represents a part used in maintenance.

    Fields:
        name (CharField): Name of the part.
        qtd (IntegerField): Quantity in stock.
        cost (DecimalField): Cost per unit.
    """
    name = models.CharField(max_length=200)
    qtd = models.IntegerField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class UsedPart(models.Model):
    """
    Represents a part used in a maintenance task.

    Fields:
        part (ForeignKey): The part that was used.
        qtd (IntegerField): Quantity of the part used.
        maintenance (ForeignKey): The maintenance task the part was used in.
    """
    part = models.ForeignKey(Part, on_delete=models.CASCADE)
    qtd = models.IntegerField()
    maintenance = models.ForeignKey(Maintenance, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.qtd} x {self.part.name} used in {self.maintenance}"




class Profile(models.Model):
    """
    Extends the built-in User model with additional information.

    Fields:
        user (OneToOneField): One-to-one relationship with the User model.
        is_active (BooleanField): Indicates if the profile is active.
        description (TextField): Optional description for the user profile.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Profile for {self.user.username}"

    def get_absolute_url(self):
        """Returns the URL to access a particular profile instance."""
        return reverse('todo_app:profile', kwargs={'profile_id': self.id})