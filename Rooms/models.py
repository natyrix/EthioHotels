from django.contrib.auth.models import User
from django.db import models
from safedelete.models import SafeDeleteModel
from safedelete.models import SOFT_DELETE_CASCADE

from Hotel.models import Hotel


class RoomType(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    room_type = models.CharField(max_length=20)
    price = models.FloatField()
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        unique_together = ('room_type', 'price', 'hotel',)

    def __str__(self):
        return self.room_type


class Room(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    status = (
        ('Reserved', 'Reserved'),
        ('CheckedIn', 'CheckedIn'),
        ('Free', 'Free')
    )
    room_no = models.CharField(max_length=10)
    room_type = models.ForeignKey(RoomType, on_delete=models.CASCADE)
    status = models.CharField(choices=status, max_length=10, default=status[2][0])
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        unique_together = ('room_no', 'hotel',)

    def __str__(self):
        return self.room_no


class Guest(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20)
    identification_card_info = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return '{} + {}'.format(self.first_name, self.last_name)


class CheckIn(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    guest = models.ForeignKey(Guest, on_delete=models.DO_NOTHING)
    room = models.ForeignKey(Room, on_delete=models.DO_NOTHING)
    start_date = models.DateField()
    end_date = models.DateField()
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True)
    receptionist = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    is_free = models.BooleanField(default=False)

    class Meta:
        unique_together = ('room',  'guest')

    def __str__(self):
        return '{} + {}'.format(self.guest, self.room)


class Reservation(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    guest = models.ForeignKey(Guest, on_delete=models.DO_NOTHING)
    room = models.ForeignKey(Room, on_delete=models.DO_NOTHING)
    start_date = models.DateField()
    end_date = models.DateField()
    receptionist = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    is_free = models.BooleanField(default=False)

    class Meta:
        unique_together = ('room', 'guest')

    def __str__(self):
        return '{} + {}'.format(self.guest, self.room)