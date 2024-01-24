# Generated by Django 5.0.1 on 2024-01-20 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0003_user_userbalance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='UserAdress',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='UserBalance',
            field=models.DecimalField(decimal_places=3, max_digits=10),
        ),
        migrations.AlterField(
            model_name='user',
            name='UserNumber',
            field=models.IntegerField(),
        ),
    ]
