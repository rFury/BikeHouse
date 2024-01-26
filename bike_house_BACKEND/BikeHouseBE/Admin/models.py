from django.db import models

class Admin(models.Model):
    choices = [
        ('ADMIN', 'ADMIN'),
        ('SuperAdmin','SuperAdmin')
    ]
    AdminId = models.AutoField(primary_key=True)
    AdminEmail = models.CharField(unique=True, max_length=250)
    AdminPassword = models.CharField(max_length=255)
    AdminName = models.CharField(max_length=255)
    AdminType = models.CharField(max_length=255,choices=choices,default="Admin")