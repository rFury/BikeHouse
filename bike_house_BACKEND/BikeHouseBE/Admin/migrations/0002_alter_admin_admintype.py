# Generated by Django 5.0.1 on 2024-01-24 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Admin', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admin',
            name='AdminType',
            field=models.CharField(choices=[('ADMIN', 'ADMIN'), ('SuperAdmin', 'SuperAdmin')], default='Admin', max_length=255),
        ),
    ]
