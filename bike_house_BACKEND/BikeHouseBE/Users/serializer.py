from rest_framework import serializers
from .models import User , BikesOrdered

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['UserId','UserName','UserEmail','UserNumber','UserAdress','UserBalance','UserPassword','ordered_bikes']
        
class BikesOrderedSerializer(serializers.ModelSerializer):
    class Meta:
        model = BikesOrdered
        fields = '__all__'