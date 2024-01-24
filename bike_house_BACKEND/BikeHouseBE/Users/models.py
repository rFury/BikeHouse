from django.db import models
from Bikes.models import Bike
class User(models.Model):
    UserId = models.AutoField(primary_key=True)
    UserName = models.CharField(max_length=255)
    UserEmail = models.EmailField(max_length=255,unique=True)
    UserNumber = models.IntegerField()
    UserAdress = models.CharField(max_length=255)
    UserBalance = models.DecimalField(max_digits=10, decimal_places=3,blank=True)
    UserPassword = models.CharField(max_length=255)
    
class BikesOrdered(models.Model):
    OrderNumber = models.AutoField(primary_key=True)
    UserId = models.ForeignKey(User, on_delete=models.CASCADE,related_name='ordered_bikes')
    Bike = models.ForeignKey(Bike, on_delete=models.CASCADE)
    DateOfOrder = models.DateField(auto_now_add=True)
    class Meta:
        unique_together = ('UserId', 'Bike')