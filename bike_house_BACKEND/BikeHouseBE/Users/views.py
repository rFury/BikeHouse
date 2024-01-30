from django.shortcuts import render
from .models import User, BikesOrdered ,AccessoriesOrdered
from Bikes.models import Bike
from Accessories.models import Accessory
from Accessories.serializer import AccessorySerializer
from Bikes.serializer import BikeSerializer
from rest_framework import status,filters,mixins,generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer , BikesOrderedSerializer ,AccessoriesOrderedSerializer


#User Side

class Get_Post_Users(mixins.CreateModelMixin,mixins.ListModelMixin,generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get(self,request):
        return self.list(request)
    def post(self,request):
        return self.create(request)

class Get_Put_Delete_User(mixins.RetrieveModelMixin,mixins.DestroyModelMixin,mixins.UpdateModelMixin,generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def get(self,request,pk):
        return self.retrieve(request)
    def put(self,request,pk):
        return self.update(request)
    def delete(self,request,pk):
        return self.destroy(request)

@api_view(['GET'])
def FindUser(request):
    UserEmail = request.query_params.get('UserEmail', '')
    UserX = User.objects.filter(
        UserEmail = UserEmail
    )
    serializer = UserSerializer(UserX,many=True)
    if UserX.count()>0:
        return Response(serializer.data)
    else:
        return Response("NotFound",status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def MakeOrder(request):
    BikeX= request.data['BikeId']
    UserX = request.data['UserId']
#    BikeX = request.query_params.get('BikeId', '')
#    UserX = request.query_params.get('UserId', '')
    try:
        UserFound = User.objects.get(UserId=UserX)
        BikeFound = Bike.objects.get(BikeId=BikeX)
        if BikeFound.Status == "On Sale":
            BikesOrderedX = BikesOrdered.objects.create(
                UserId=UserFound,
                Bike=BikeFound,
            )
            UserFound.UserBalance -= BikeFound.Price
            UserFound.save()
            BikeFound.Status = "Sold"
            BikeFound.save()

            serializer = BikesOrderedSerializer(BikesOrderedX)
            return Response(serializer.data)
        else:
            return Response("Bike is already Sold", status=status.HTTP_400_BAD_REQUEST)

    except (UserFound.DoesNotExist, BikeFound.DoesNotExist):
        return Response("User or Bike not found", status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def MakeOrderAccessory(request):
    AccessoryX=request.data['AccessoryId']
    UserX=request.data['UserId']
    Quantity=request.data['Quantity']
    try:
        UserFound = User.objects.get(UserId=UserX)
        AccessoryFound = Accessory.objects.get(AccessoryId=AccessoryX)
        if AccessoryFound.Quantity>0 and Quantity>0 and Quantity<=AccessoryFound.Quantity:
            if UserFound.UserBalance>(AccessoryFound.Price*Quantity):
                AccessoryOrderX = AccessoriesOrdered.objects.create(
                    UserId=UserFound,
                    Accessory = AccessoryFound,
                    QuantityOrdered = Quantity,
                )
                UserFound.UserBalance-=(AccessoryFound.Price*Quantity)
                AccessoryFound.Quantity-=Quantity
                if AccessoryFound.Quantity==0:
                    AccessoryFound.Status='Out Of Stock'
                UserFound.save()
                AccessoryFound.save()
                
                serializer = AccessoriesOrderedSerializer(AccessoryOrderX)
                return Response(serializer.data)
            else:
                return Response("not enough balance",status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response("Quantity error",status=status.HTTP_400_BAD_REQUEST)
    except (UserFound.DoesNotExist,AccessoryFound.DoesNotExist):
        return Response("NOT FOUND",status=status.HTTP_400_BAD_REQUEST)
                
    
#Order Side
class Get_Post_Orders(mixins.CreateModelMixin,mixins.ListModelMixin,generics.GenericAPIView):
    queryset = BikesOrdered.objects.all()
    serializer_class = BikesOrderedSerializer
    def get(self,request):
        return self.list(request)
    def post(self,request):
        return self.create(request)

class Get_Put_Delete_Orders(mixins.RetrieveModelMixin,mixins.DestroyModelMixin,mixins.UpdateModelMixin,generics.GenericAPIView):
    queryset = BikesOrdered.objects.all()
    serializer_class = BikesOrderedSerializer
    def get(self,request,pk):
        return self.retrieve(request)
    def put(self,request,pk):
        return self.update(request)
    def delete(self,request,pk):
        return self.destroy(request)
    
@api_view(['GET'])
def FindOrders(request):
    order_ids = request.query_params.getlist('Orders', [])

    try:
        order_ids = list(map(int, order_ids))
    except ValueError:
        return Response("can convert list"+str(order_ids), status=400)

    if order_ids:
        Orders = BikesOrdered.objects.filter(OrderNumber__in=order_ids)
        
        serializer = BikesOrderedSerializer(Orders, many=True)
        
        if Orders.exists():
            return Response(serializer.data)
        else:
            return Response("NotFound", status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Order IDs not provided"+str(order_ids), status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def FindOrdersA(request):
    order_ids = request.query_params.getlist('Orders',[])
    
    try:
        order_ids = list(map(int,order_ids))
    except ValueError:
        return Response("can convert list"+str(order_ids),status=400)
    
    if order_ids:
        Orders = AccessoriesOrdered.objects.filter(OrderNumber__in=order_ids)
        
        serializer = AccessoriesOrderedSerializer(Orders,many=True)
        
        if Orders.exists():
            return Response(serializer.data)
        else:
            return Response("NotFound", status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Order IDs not provided"+str(order_ids),status=status.HTTP_404_NOT_FOUND)
    

