from django.contrib import admin
from django.urls import path
from Bikes import views as bikes_views
from Users import views as users_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('Bikes',bikes_views.Get_Post_Bikes.as_view()),
    path('Bikes/<int:pk>', bikes_views.Get_Put_Delete_Bikes.as_view()),
    path('Users',users_views.Get_Post_Users.as_view()),
    path('Users/<int:pk>', users_views.Get_Put_Delete_User.as_view()),
    path('Orders',users_views.Get_Post_Orders.as_view()),
    path('Orders/<int:pk>',users_views.Get_Put_Delete_Orders.as_view()),
    path('Users/FindUser',users_views.FindUser),
    path('Bikes/FindBikes',bikes_views.FindBikes),
    path('Users/OrderBike',users_views.MakeOrder),
    path('Orders/FindOrders',users_views.FindOrders),
    path('Bikes/BikesIds',bikes_views.getBikesByIds),
]
