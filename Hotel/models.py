from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Hotel(models.Model):

    statuses = (
        ('verified', 'verified'),
        ('unverified', 'unverified'),
        ('deactivated', 'deactivated'),
    )

    clerk = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    cover_img_location = models.ImageField(upload_to='photos/')
    website = models.CharField(max_length=30)
    API = models.CharField(max_length=30)
    location_lat = models.DecimalField(max_digits=9, decimal_places=6)
    location_long = models.DecimalField(max_digits=9, decimal_places=6)
    email = models.CharField(max_length=30)
    phone = models.CharField(max_length=13)
    city = models.CharField(max_length=20)
    reg_date = models.DateField(default=timezone.now)
    description = models.TextField()
    status = models.CharField(choices=statuses, max_length=30)

    def __str__(self):
        return self.name


class HotelGallery(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    img_location = models.ImageField(upload_to='HotelImages/')

    def __str__(self):
        return self.hotel.name


class SubscriptionofHotel(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    sub_start_date = models.DateField(default=timezone.now)
    sub_end_date = models.DateField()
    sub_detail = models.TextField()

    def __str__(self):
        return self.hotel.name


class Feature(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class HotelFeature(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)

    def __str__(self):
        return self.hotel.name

