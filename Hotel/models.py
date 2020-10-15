from safedelete.models import SafeDeleteModel
from safedelete.models import SOFT_DELETE_CASCADE
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_save
from django.utils import timezone


class Hotel(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    status = (
        ('verified', 'verified'),
        ('unverified', 'unverified'),
        ('deactivated', 'deactivated'),
    )

    slug = models.SlugField(blank=True, null=True, unique=True)
    name = models.CharField(max_length=30)
    cover_img_location = models.ImageField(upload_to='photos/', default='photos/default-logo.png')
    website = models.CharField(max_length=30, unique=True, null=True)
    API = models.CharField(max_length=30, unique=True, null=True)
    location_desc = models.TextField()
    location_lat = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    location_long = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    email = models.EmailField(max_length=30, unique=True)
    phone = models.CharField(max_length=13)
    city = models.CharField(max_length=20)
    reg_date = models.DateField(default=timezone.now)
    description = models.TextField()
    is_reg_completed = models.BooleanField(default=False)
    status = models.CharField(choices=status, max_length=20, default="unverified")
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name


class HotelClerk(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    clerk = models.ForeignKey(User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.hotel.name


class HotelReceptionist(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    receptionist = models.ForeignKey(User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.hotel.name


class HotelGallery(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    img_location = models.ImageField(upload_to='HotelImages/')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.hotel.name


class SubscriptionofHotel(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    sub_start_date = models.DateField(default=timezone.now)
    sub_end_date = models.DateField()
    sub_detail = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.hotel.name


class Feature(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name


class HotelFeature(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.hotel.name


def slug_generator(sender, instance, *args, **kwargs):
    ename = instance.email.split('@')
    slname = instance.name + ename[0] + instance.city
    slname = str(slname).replace(' ', '-')
    instance.slug = slname


pre_save.connect(slug_generator, sender=Hotel)
