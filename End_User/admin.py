from django.contrib import admin
from .models import Rating, End_User, HotelRating, Comment, Interest


class HotelRatingAdmin(admin.ModelAdmin):
    list_display = ('id', 'hotel', 'end_user', 'rating', 'rating_value', 'created_at')
    list_display_links = ('id', 'hotel')
    list_filter = ('rating', 'hotel', 'end_user', 'rating_value')
    search_fields = ('rating', 'hotel', 'end-user')
    list_per_page = 20


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'hotel', 'end_user', 'content', 'created_at')
    list_display_links = ('id', 'hotel')
    list_filter = ('hotel', 'end_user')
    search_fields = ('content', 'hotel', 'end-user')
    list_per_page = 20


class InterestAdmin(admin.ModelAdmin):
    list_display = ('id', 'hotel', 'end_user')
    list_display_links = ('id', 'end_user')
    list_filter = ('end_user', 'hotel')
    search_fields = ('hotel', 'end-user')
    list_per_page = 20


admin.site.register(Rating)
admin.site.register(End_User)
admin.site.register(HotelRating, HotelRatingAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Interest, InterestAdmin)

