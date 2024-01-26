from django.db import models

class Accessory(models.Model):
    StatusChoices = [
        ('On Sale', 'On Sale'),
        ('Out Of Stock', 'Out Of Stock'),
        ('Coming Soon', 'Coming Soon'),
    ]
    TypeChoices = [
        ('Luggage Gear', 'Luggage Gear'),
        ('Safety Gear', 'Safety Gear'),
        ('Track Gear', 'Track Gear'),
    ]

    AccessoryId = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    NameOfProduct = models.CharField(max_length=255)
    Type = models.CharField(max_length=20, choices=TypeChoices)
    Year = models.IntegerField()
    Description = models.TextField()
    Price = models.DecimalField(max_digits=10, decimal_places=3)
    Brand = models.CharField(max_length=255)
    Status = models.CharField(max_length=20, choices=StatusChoices)
    Quantity = models.IntegerField()
    Picture_File_Name = models.CharField(max_length=255)