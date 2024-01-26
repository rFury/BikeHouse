from django.shortcuts import render
from .models import Admin
from rest_framework import status,filters,mixins,generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import AdminSerializer

class Get_Post_Admins(mixins.CreateModelMixin,mixins.ListModelMixin,generics.GenericAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    def get(self,request):
        return self.list(request)
    def post(self,request):
        return self.create(request)

class Get_Put_Delete_Admins(mixins.RetrieveModelMixin,mixins.DestroyModelMixin,mixins.UpdateModelMixin,generics.GenericAPIView):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer
    def get(self,request,pk):
        return self.retrieve(request)
    def put(self,request,pk):
        return self.update(request)
    def delete(self,request,pk):
        return self.destroy(request)

@api_view(['GET'])
def FindAdmin(request):
    AdminEmail = request.query_params.get('AdminEmail', '')
    AdminX = Admin.objects.filter(
        AdminEmail = AdminEmail,
    )
    serializer = AdminSerializer(AdminX,many=True)
    if AdminX.count()>0:
        return Response(serializer.data)
    else:
        return Response("NotFound",status=status.HTTP_400_BAD_REQUEST)