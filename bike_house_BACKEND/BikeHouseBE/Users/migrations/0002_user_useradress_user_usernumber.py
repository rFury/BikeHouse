# Generated by Django 5.0.1 on 2024-01-20 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='UserAdress',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='UserNumber',
            field=models.IntegerField(null=True),
        ),
    ]
