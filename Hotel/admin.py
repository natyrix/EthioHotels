from django.contrib import admin
from .models import Hotel, HotelGallery, SubscriptionofHotel, Feature, HotelFeature, HotelClerk
from django.contrib.auth.models import Group


class HotelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'location_lat', 'location_long', 'email', 'city', 'reg_date', 'description', 'status')
    list_display_links = ('id', 'name')
    list_filter = ('city', 'status', 'reg_date')
    list_per_page = 20
    search_fields = ('city', 'description',)

    def has_delete_permission(self, request, obj=None):
        return False


class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'hotel', 'sub_start_date', 'sub_end_date', 'sub_detail')
    list_display_links = ('id', 'hotel')
    list_filter = ('hotel', 'sub_start_date', 'sub_end_date')
    search_fields = ('sub_detail', )


class HotelFeatureAdmin(admin.ModelAdmin):
    list_display = ('id', 'hotel', 'feature')
    list_display_links = ('id', 'hotel')
    list_filter = ('hotel', 'feature')
    list_per_page = 20
    search_fields = ('hotel', 'feature')


class HotelClerkAdmin(admin.ModelAdmin):
    list_display = ('id', 'hotel', 'clerk')
    list_display_links = ('id', 'hotel')
    list_filter = ('hotel',)
    list_per_page = 20
    search_fields = ('hotel', 'clerk')


admin.site.disable_action('delete_selected')
admin.site.unregister(Group)
admin.site.register(Hotel, HotelAdmin)
admin.site.register(HotelGallery)
admin.site.register(HotelFeature, HotelFeatureAdmin)
admin.site.register(Feature)
admin.site.register(SubscriptionofHotel, SubscriptionAdmin)
admin.site.register(HotelClerk, HotelClerkAdmin)
