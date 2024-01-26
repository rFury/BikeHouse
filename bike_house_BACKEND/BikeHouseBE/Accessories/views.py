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