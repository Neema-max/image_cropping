from django.urls import path
from . import views
urlpatterns = [
    path('croppingtool/', views.croppingtool, name="croppingtool"),
    path('success/<int:id>',views.final,name='final'),
]