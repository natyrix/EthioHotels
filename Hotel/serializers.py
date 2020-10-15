from django.contrib.auth.models import User
from rest_framework import serializers

from End_User.models import HotelRating, Comment
from Hotel.models import HotelGallery, Hotel, HotelReceptionist
from Rooms.models import Room, RoomType, CheckIn, Guest, Reservation


class RatingSerializer(serializers.ModelSerializer):
    hotel_name = serializers.CharField(source='hotel')
    user_name = serializers.CharField(source='end_user')
    rating_name = serializers.CharField(source='rating')

    class Meta:
        model = HotelRating
        fields = ['id', 'hotel_name', 'user_name', 'rating_name', 'rating_value', 'updated_at']


class ReviewSerializer(serializers.ModelSerializer):
    hotel_name = serializers.CharField(source='hotel')
    user_name = serializers.CharField(source='end_user')

    class Meta:
        model = Comment
        fields = ['id', 'hotel_name', 'user_name', 'updated_at', 'content']


class GallerySerializer(serializers.ModelSerializer):
    # hotel_name = serializers.CharField(source='hotel')

    class Meta:
        model = HotelGallery
        fields = ['id', 'hotel', 'img_location', 'updated_at']


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'cover_img_location', 'email', 'phone', 'city', 'description']


class RoomTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = RoomType
        fields = ['id', 'room_type', 'hotel', 'price', 'created_at']


class RoomSerializer(serializers.ModelSerializer):
    room_type = RoomTypeSerializer()

    class Meta:
        model = Room
        fields = ['id', 'room_no', 'status', 'hotel', 'created_at', 'room_type']


class RoomSerializer1(serializers.ModelSerializer):

    class Meta:
        model = Room
        fields = ['id', 'room_no', 'status', 'hotel', 'created_at', 'room_type']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'date_joined']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True
            }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class HotelRecSerializer1(serializers.ModelSerializer):
    receptionist = UserSerializer()

    class Meta:
        model = HotelReceptionist
        fields = ['id', 'hotel', 'receptionist']


class HotelRecSerializer(serializers.ModelSerializer):

    class Meta:
        model = HotelReceptionist
        fields = ['id', 'hotel', 'receptionist']


class GuestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Guest
        fields = ['id', 'first_name', 'last_name', 'phone_number', 'identification_card_info', 'created_at']


class CheckInSerializer(serializers.ModelSerializer):
    guest = GuestSerializer()
    room = RoomSerializer()
    receptionist = UserSerializer()

    class Meta:
        model = CheckIn
        fields = ['id', 'room', 'guest', 'start_date', 'end_date', 'receptionist', 'created_at']


class ChangePasswordSerializer(serializers.Serializer):
    old_pass = serializers.CharField()
    new_pass = serializers.CharField()
    con_pass = serializers.CharField()


class CheckInSerializer1(serializers.ModelSerializer):

    class Meta:
        model = CheckIn
        fields = ['id', 'room', 'guest', 'start_date', 'end_date', 'hotel', 'receptionist', 'created_at', 'is_free']


class ReservationSerializer1(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ['id', 'room', 'guest', 'start_date', 'end_date', 'hotel', 'receptionist', 'created_at', 'is_free']


