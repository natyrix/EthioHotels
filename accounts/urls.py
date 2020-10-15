from django.urls import path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter
from accounts.views import UserViewSet, HotelViewSet, LoginViewSet, GetHotelViewSet, CompleteRegistration, \
    IsCompletedViewSet, HasAPI, IsAdmin

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('is_completed', IsCompletedViewSet)
router.register('has_api', HasAPI)

urlpatterns = [
    path('', include(router.urls)),
    path('hotels', HotelViewSet.as_view()),
    path('login', LoginViewSet.as_view()),
    path('complete_register', CompleteRegistration.as_view()),
    path('loadHotel', GetHotelViewSet.as_view()),
    path('is_admin', IsAdmin.as_view()),
]
