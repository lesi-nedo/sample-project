from django.contrib import admin
from django.urls import include, path
from myapp.urls import urlpatterns as myapp_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(myapp_urls)),
]
