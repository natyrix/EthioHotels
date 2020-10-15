from django.contrib import admin
from .models import Room, RoomType, Reservation, CheckIn, Guest


class RoomTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'room_type', 'hotel', 'price', 'created_at')
    list_display_links = ('id', 'room_type')
    list_filter = ('room_type', 'hotel', 'price')
    list_per_page = 20
    search_fields = ('hotel', 'price', 'room_type')

    def has_delete_permission(self, request, obj=None):
        return False


class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'room_no', 'room_type', 'status', 'hotel', 'created_at')
    list_display_links = ('id', 'room_no')
    list_filter = ('room_type', 'hotel', 'status')
    list_per_page = 20
    search_fields = ('hotel', 'room_type')

    def has_delete_permission(self, request, obj=None):
        return False


class GuestAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'phone_number', 'created_at')
    list_display_links = ('id', 'first_name')
    list_filter = ('first_name', 'last_name', 'created_at')
    list_per_page = 20
    search_fields = ('first_name', 'last_name', 'phone_number')

    def has_delete_permission(self, request, obj=None):
        return False


class RCAdmin(admin.ModelAdmin):
    list_display = ('id', 'guest', 'room', 'start_date', 'end_date', 'receptionist', 'created_at')
    list_display_links = ('id', 'guest', 'room')
    list_filter = ('start_date', 'end_date', 'receptionist', 'created_at')
    list_per_page = 20
    search_fields = ('guest', 'room')

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(RoomType, RoomTypeAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(Guest, GuestAdmin)
admin.site.register(CheckIn, RCAdmin)
admin.site.register(Reservation, RCAdmin)
