from rest_framework import serializers
from .models import User , BikesOrdered ,AccessoriesOrdered

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['UserId','UserName','UserEmail','UserNumber','UserAdress','UserBalance','UserPassword','ordered_bikes','ordered_accessories']
        
class BikesOrderedSerializer(serializers.ModelSerializer):
    class Meta:
        model = BikesOrdered
        fields = '__all__'
        
class AccessoriesOrderedSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessoriesOrdered
        fields = '__all__'