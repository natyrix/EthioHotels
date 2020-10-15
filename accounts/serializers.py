from django.utils import timezone
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from Hotel.models import Hotel, HotelClerk


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'required': True
            }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class UserSerializerOne(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()

    def create(self, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        email = validated_data.get('email')

        user = User.objects.create_user(
            username=username, password=password, first_name=first_name,
            last_name=last_name, email=email)
        user.save()
        Token.objects.create(user=user)
        return user


class HotelClerkSerializer(serializers.Serializer):
    clerk = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    hotel = serializers.PrimaryKeyRelatedField(queryset=Hotel.objects.all())

    def create(self, validated_data):
        clerk = validated_data.get('clerk')
        hotel = validated_data.get('hotel')
        hc = HotelClerk(
            clerk=clerk,
            hotel=hotel
        )
        hc.save()
        return hc


class HotelSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=30)
    location_desc = serializers.CharField()
    email = serializers.EmailField(max_length=30)
    phone = serializers.CharField(max_length=13)
    city = serializers.CharField(max_length=20)
    description = serializers.CharField()

    def create(self, validated_data):
        name = validated_data.get('name')
        location_desc = validated_data.get('location_desc')
        email = validated_data.get('email')
        phone = validated_data.get('phone')
        city = validated_data.get('city')
        description = validated_data.get('description')
        hotel = Hotel(
            name=name, location_desc=location_desc,
            email=email, phone=phone, city=city, description=description,
        )
        hotel.save()
        return hotel


class HotelCompleteRegistrationSerializer(serializers.Serializer):
    API = serializers.CharField(max_length=30, allow_null=True)
    website = serializers.CharField(max_length=30, allow_null=True)
    location_lat = serializers.DecimalField(max_digits=9, decimal_places=6)
    location_long = serializers.DecimalField(max_digits=9, decimal_places=6)
    is_reg_completed = serializers.BooleanField()

    def update(self, instance, validated_data):
        instance.API = validated_data.get('API', instance.API)
        instance.website = validated_data.get('website', instance.website)
        instance.location_lat = validated_data.get('location_lat', instance.location_lat)
        instance.location_long = validated_data.get('location_long', instance.location_long)
        instance.is_reg_completed = True
        instance.save()
        return instance


class HotelSerializerall(serializers.Serializer):
    slug = serializers.SlugField()
    name = serializers.CharField(max_length=30)
    cover_img_location = serializers.ImageField()
    website = serializers.CharField(max_length=30)
    API = serializers.CharField(max_length=30)
    location_desc = serializers.CharField()
    location_lat = serializers.DecimalField(max_digits=9, decimal_places=6)
    location_long = serializers.DecimalField(max_digits=9, decimal_places=6)
    email = serializers.EmailField(max_length=30)
    phone = serializers.CharField(max_length=13)
    city = serializers.CharField(max_length=20)
    reg_date = serializers.DateField(default=timezone.now)
    description = serializers.CharField()
    status = serializers.CharField(max_length=30)


class IsCompletedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'is_reg_completed']


class HasAPISerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'API', 'slug']
