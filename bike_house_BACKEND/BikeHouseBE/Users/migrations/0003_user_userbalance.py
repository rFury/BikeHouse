# Generated by Django 5.0.1 on 2024-01-20 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0002_user_useradress_user_usernumber'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='UserBalance',
            field=models.DecimalField(decimal_places=3, max_digits=10, null=True),
        ),
    ]
