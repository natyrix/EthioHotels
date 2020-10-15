from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('api/hotels/', include('Hotel.urls')),
    path('auth/', obtain_auth_token),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
