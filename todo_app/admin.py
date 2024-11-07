from django.contrib import admin
from todo_app.models import Todo, Category, Profile

# Register your models here.

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "user", "category", "created_at", "updated_at", "is_active"]
    list_display_links = ["id", "title"]
    list_filter = ["category", "user", "is_active"]
    search_fields = ["title", "content"]
    date_hierarchy = "created_at"

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["title", "user", "is_active"]
    list_display_links = ["title"]
    list_filter = ["user", "is_active"]
    search_fields = ["title"]

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["user"]
    search_fields = ["user__username"]