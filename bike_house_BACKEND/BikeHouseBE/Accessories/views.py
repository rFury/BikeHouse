from django.shortcuts import render
from .models import Accessory
from rest_framework import status,filters,mixins,generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import AccessorySerializer

class Get_Post_Accessory(mixins.CreateModelMixin,mixins.ListModelMixin,generics.GenericAPIView):
    queryset = Accessory.objects.all()
    serializer_class = AccessorySerializer
    def get(self,request):
        return self.list(request)
    def post(self,request):
        return self.create(request)

class Get_Put_Delete_Accessory(mixins.RetrieveModelMixin,mixins.DestroyModelMixin,mixins.UpdateModelMixin,generics.GenericAPIView):
    queryset = Accessory.objects.all()
    serializer_class = AccessorySerializer
    def get(self,request,pk):
        return self.retrieve(request)
    def put(self,request,pk):
        return self.update(request)
    def delete(self,request,pk):
        return self.destroy(request)
    
@api_view(['GET'])
def FindAccessories(request):
    def is_not_empty(value):
        return value is not None and value != "undefined" and value != "null"

    AccessoryName = request.query_params.get('AccessoryName', '')
    AccessoryYear = request.query_params.get('AccessoryYear', None)
    AccessoryBrand = request.query_params.get('AccessoryBrand', '')
    AccessoryPrice = request.query_params.get('AccessoryPrice', None)
    AccessoryType = request.query_params.get('AccessoryType', '')
    AccessoryStatus = request.query_params.get('AccessoryStatus','')

    filters = {}
    if is_not_empty(AccessoryName):
        filters['Name__icontains'] = AccessoryName
    if is_not_empty(AccessoryBrand):
        filters['Brand__icontains'] = AccessoryBrand
    if is_not_empty(AccessoryType):
        filters['Type__icontains'] = AccessoryType
    if is_not_empty(AccessoryYear):
        filters['Year'] = AccessoryYear
    if is_not_empty(AccessoryPrice):
        filters['Price__gte'] = AccessoryPrice
    if is_not_empty(AccessoryStatus):
        filters['Status'] = AccessoryStatus
        
        
    AccessoryX = Accessory.objects.filter(**filters).order_by('-Price')
    serializer = AccessorySerializer(AccessoryX, many=True)
    
    if AccessoryX.exists():
        return Response(serializer.data)
    else:
        return Response("NotFound", status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
def getAccessotriesByIds(request):
    ids = request.query_params.getlist('Accessories', [])
    try:
        ids = list(map(int, ids))
    except ValueError:
        return Response("can convert list"+str(ids), status=400)

    if ids:
        Accessories = Accessory.objects.filter(AccessoryId__in=ids)
        
        serializer = AccessorySerializer(Accessories, many=True)
        
        if Accessories.exists():
            return Response(serializer.data)
        else:
            return Response("NotFound", status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Accessoy*ry IDs not provided"+str(ids), status=status.HTTP_400_BAD_REQUEST)