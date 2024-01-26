from django.contrib import admin
from django.urls import path
from Bikes import views as bikes_views
from Users import views as users_views
from Admin import views as admin_views
from Accessories import views as accessory_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('Admins',admin_views.Get_Post_Admins.as_view()),
    path('Admins/<int:pk>',admin_views.Get_Put_Delete_Admins.as_view()),
    path("Admins/FindAdmin", admin_views.FindAdmin),
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
    path('Accessories',accessory_views.Get_Post_Accessory.as_view()),
    path('Accessories/<int:pk>',accessory_views.Get_Put_Delete_Accessory.as_view()),
]
