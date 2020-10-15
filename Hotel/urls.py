from django.urls import path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter
from Hotel.views import RatingViewSet, ReviewViewSet, GalleryView, AccountView, RoomView, RoomTypeView, \
    ReceptionistView, CheckInView, ReservationView, ChangeRecPass, ChangeHotPass, RecRoomView, RecRoomTypeView, \
    RecCheckInView, RecReservationView

router = DefaultRouter()
router.register('ratings', RatingViewSet)
router.register('reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('hotel_gallery/', GalleryView.as_view(), name='hotel_gallery'),
    path('hotel_rooms/', RoomView.as_view(), name='hotel_rooms'),
    path('hotel_room_types/', RoomTypeView.as_view(), name='hotel_room_types'),
    path('hotel_receptionists/', ReceptionistView.as_view(), name='hotel_receptionists'),
    path('hotel_receptionists/<int:pk>/', ChangeRecPass.as_view(), name='hotel_receptionists_change_pass'),
    path('hotel_checkins/', CheckInView.as_view(), name='hotel_checkins'),
    path('hotel_reservations/', ReservationView.as_view(), name='hotel_reservations'),
    path('hotel_account/', AccountView.as_view(), name='hotel_account'),
    path('hotel_account/pw/<int:pk>/', ChangeHotPass.as_view(), name='hotel_account_pw'),
    path('hotel_account/<int:pk>/', AccountView.as_view(), name='hotel_account_update'),
    path('hotel_rooms/<int:pk>/', RoomView.as_view(), name='hotel_room_delete'),
    path('hotel_room_types/<int:pk>/', RoomTypeView.as_view(), name='hotel_room_type_delete'),
    path('hotel_gallery/<int:pk>/', GalleryView.as_view(), name='hotel_gallery_delete'),
    path('hotel_receptionists/<int:pk>/', ReceptionistView.as_view(), name='hotel_receptionist_delete'),
    path('rec/hotel_rooms/', RecRoomView.as_view(), name='hotel_receptionist_rooms'),
    path('rec/hotel_room_types/', RecRoomTypeView.as_view(), name='hotel_receptionist_rooms'),
    path('rec/hotel_checkins/', RecCheckInView.as_view(), name='hotel_receptionist_checkin'),
    path('rec/hotel_reservations/', RecReservationView.as_view(), name='hotel_receptionist_checkin'),
]
