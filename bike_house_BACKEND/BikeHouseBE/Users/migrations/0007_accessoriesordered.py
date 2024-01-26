# Generated by Django 5.0.1 on 2024-01-26 11:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Accessories', '0001_initial'),
        ('Users', '0006_alter_bikesordered_unique_together'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccessoriesOrdered',
            fields=[
                ('OrderNumber', models.AutoField(primary_key=True, serialize=False)),
                ('QuantityOrdered', models.IntegerField()),
                ('DateOfOrder', models.DateField(auto_now_add=True)),
                ('Accessory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Accessories.accessory')),
                ('UserId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ordered_accessories', to='Users.user')),
            ],
        ),
    ]