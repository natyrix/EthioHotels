from django.db import models
from datetime import datetime
from Hotel.models import Hotel


class Rating(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class End_User(models.Model):
    email = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.email


class HotelRating(models.Model):

    rating_vals = (
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5')
    )

    end_user = models.ForeignKey(End_User, models.CASCADE)
    hotel = models.ForeignKey(Hotel, models.CASCADE)
    rating = models.ForeignKey(Rating, models.CASCADE)
    rating_value = models.IntegerField(choices=rating_vals)
    created_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.hotel.name


class Comment(models.Model):
    content = models.TextField()
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    end_user = models.ForeignKey(End_User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.hotel.name


class Interest(models.Model):
    end_user = models.ForeignKey(End_User, on_delete=models.CASCADE)
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)

    def __str__(self):
        return self.hotel.name
