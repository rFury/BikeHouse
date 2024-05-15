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
        
class CombinedOrderSerializer(serializers.Serializer):
    orders = serializers.DictField(child=serializers.DictField())

    def to_representation(self, instance):
        representation = []
        for order in instance:
            order_data = {
                'OrderNumber': order.OrderNumber,
                'UserId': order.UserId,
                'ProductID': order.ProductID,
                'Quantity': order.Quantity,
                'DateOfOrder': order.DateOfOrder,
                'which': order.which
            }
            representation.append(order_data)
        return representation

