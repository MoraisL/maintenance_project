from django import forms
from django.contrib.auth.models import User
from .models import Todo, Profile, Category
from django.core import validators

def validate_email_unique(value):
    if User.objects.filter(email=value).exists():
        raise forms.ValidationError("Este email já foi registrado. Tente novamente com outro.")

class UserForm(forms.ModelForm):
    email = forms.EmailField(
        validators=[
            validators.EmailValidator(message='Verifique de o email está correto.'),
            validate_email_unique
        ]
    )
    password = forms.CharField(
        widget=forms.PasswordInput(),
        validators=[
            validators.MinLengthValidator(1,message='Coloque uma senha com pelo menos 1 caracter.'),
        ]
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
        ]

class ProfileModelForm(forms.ModelForm):
    first_name = forms.CharField()
    last_name = forms.CharField()

    class Meta:
        model = Profile
        fields = [
            'first_name',
            'last_name',
            'description',
        ]

class TodoModelForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea(attrs={'cols': 100, 'rows': 20}))
    tag = forms.CharField(required=False)

    class Meta:
        model = Todo
        fields = [
            'title',
            'is_active',
            'category',
            'content',
            'tag',
        ]

class CategoryModelForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = [
            'title',
            'is_active',
        ]