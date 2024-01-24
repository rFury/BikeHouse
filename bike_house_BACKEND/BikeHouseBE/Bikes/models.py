from django.db import models

class Bike(models.Model):
    StatusChoices = [
        ('On Sale', 'On Sale'),
        ('Sold', 'Sold'),
        ('Coming Soon', 'Coming Soon'),
    ]
    TypeChoices = [
        ('Dirt Bike', 'Dirt Bike'),
        ('Adventure Bike', 'Adventure Bike'),
        ('Sports Touring Bike', 'Sports Touring Bike'),
        ('Sport Bike', 'Sport Bike'),
        ('Track Bike', 'Track Bike'),
        ('HyperSport Bike', 'HyperSport Bike'),
    ]

    BikeId = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=255)
    Type = models.CharField(max_length=20, choices=TypeChoices)
    Year = models.IntegerField()
    Description = models.TextField()
    Price = models.DecimalField(max_digits=10, decimal_places=3)
    Brand = models.CharField(max_length=255)
    Status = models.CharField(max_length=20, choices=StatusChoices)
    Picture_File_Name = models.CharField(max_length=255)
