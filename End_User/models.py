from safedelete.models import SafeDeleteModel
from safedelete.models import SOFT_DELETE_CASCADE
from django.db import models
from Hotel.models import Hotel


class Rating(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    name = models.CharField(max_length=30, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name


class End_User(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    email = models.CharField(max_length=30, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.email


class HotelRating(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    rating_vals = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5')
    )

    end_user = models.ForeignKey(End_User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    rating = models.ForeignKey(Rating, on_delete=models.CASCADE)
    rating_value = models.IntegerField(choices=rating_vals)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.hotel.name


class Comment(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    content = models.TextField()
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    end_user = models.ForeignKey(End_User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.hotel.name


class Interest(SafeDeleteModel):
    _safedelete_policy = SOFT_DELETE_CASCADE

    end_user = models.ForeignKey(End_User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.hotel.name
