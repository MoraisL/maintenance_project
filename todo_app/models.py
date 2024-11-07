from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
import random, string
from django.utils.timezone import localtime

# Base model
class BaseModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    is_active = models.BooleanField(default=False)

    class Meta:
        abstract = True
        ordering = ('title',)

class Category(BaseModel):
    created_time = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    def get_abso_url(self):
        return reverse('todo_app:category_detail', kwargs={'category_id': self.id})

class Todo(BaseModel):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def get_abso_url(self):
        return reverse('todo_app:todo_view', kwargs={'todo_id': self.id})

    class Meta:
        ordering = ('created_at',)

    def formatted_created_at(self):
        return localtime(self.created_at).strftime('%Y-%m-%d %H:%M')

    def formatted_updated_at(self):
        return localtime(self.updated_at).strftime('%Y-%m-%d %H:%M')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    description = models.TextField(blank=True, null=True)

    def get_abso_url(self):
        return reverse('todo_app:profile', kwargs={'profile_id': self.id})