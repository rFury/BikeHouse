from django.shortcuts import render
from .models import Bike
from rest_framework import status,filters,mixins,generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import BikeSerializer

class Get_Post_Bikes(mixins.CreateModelMixin,mixins.ListModelMixin,generics.GenericAPIView):
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer
    def get(self,request):
        return self.list(request)
    def post(self,request):
        return self.create(request)

class Get_Put_Delete_Bikes(mixins.RetrieveModelMixin,mixins.DestroyModelMixin,mixins.UpdateModelMixin,generics.GenericAPIView):
    queryset = Bike.objects.all()
    serializer_class = BikeSerializer
    def get(self,request,pk):
        return self.retrieve(request)
    def put(self,request,pk):
        return self.update(request)
    def delete(self,request,pk):
        return self.destroy(request)
    
@api_view(['GET'])
def FindBikes(request):
    def is_not_empty(value):
        return value is not None and value != "undefined" and value != "null"

    BikeName = request.query_params.get('BikeName', '')
    BikeYear = request.query_params.get('BikeYear', None)
    BikeBrand = request.query_params.get('BikeBrand', '')
    BikePrice = request.query_params.get('BikePrice', None)
    BikeType = request.query_params.get('BikeType', '')

    filters = {}
    if is_not_empty(BikeName):
        filters['Name__icontains'] = BikeName
    if is_not_empty(BikeBrand):
        filters['Brand__icontains'] = BikeBrand
    if is_not_empty(BikeType):
        filters['Type__icontains'] = BikeType
    if is_not_empty(BikeYear):
        filters['Year'] = BikeYear
    if is_not_empty(BikePrice):
        filters['Price__gte'] = BikePrice
        
        
    BikeX = Bike.objects.filter(**filters).order_by('-Price')
    serializer = BikeSerializer(BikeX, many=True)
    
    if BikeX.exists():
        return Response(serializer.data)
    else:
        return Response("NotFound", status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def getBikesByIds(request):
    ids = request.query_params.getlist('Bikes', [])
    try:
        ids = list(map(int, ids))
    except ValueError:
        return Response("can convert list"+str(ids), status=400)

    if ids:
        Bikes = Bike.objects.filter(BikeId__in=ids)
        
        serializer = BikeSerializer(Bikes, many=True)
        
        if Bikes.exists():
            return Response(serializer.data)
        else:
            return Response("NotFound", status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Bike IDs not provided"+str(ids), status=status.HTTP_400_BAD_REQUEST)