from django.contrib import admin, messages
from api.models import *


class RegionAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name'
    )

class BranchAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'region'
    )

class PostageAdmin(admin.ModelAdmin):
    list_display = (
        'postage_type',
        'rate'
    )


class UserAccountDetailsAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'full_name',
        'company_name'
    )

@admin.action(description='Mark as In Transit')
def mark_transit(ShipmentAdmin, request, queryset):
    queryset.update(shipment_status='in_transit')
    messages.add_message(request, messages.SUCCESS, 'Selected shipments have been marked as In Transit.')

@admin.action(description='Mark as Completed')
def mark_completed(ShipmentAdmin, request, queryset):
    queryset.update(shipment_status='completed')
    messages.add_message(request, messages.SUCCESS, 'Selected shipments have been marked as Completed.')

class ShipmentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'address1',
        'city',
        'country',
        'phone',
        'created_date',
    )
    list_filter = (
        'shipment_status',
        'postage_type',
        'country',
        'city',
    )
    actions = [mark_transit, mark_completed]


class PickupDetailAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'address1',
        'city',
        'country',
        'phone',
    )


class ImportShipmentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'user',
        'file_name',
        'time_stamp',
    )


class PackageTypeAdmin(admin.ModelAdmin):
    list_display = (
        'name',
    )


class PackageTypeOptionAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'description',
        'package_type',
    )


class AddressAdmin(admin.ModelAdmin):
    list_display = (
        'address',
        'id',
        'city',
        'country',
    )


class BatchAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'batch_id',
        'user',
        'created_date',
    )


class PrepPackShipAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'name',
        'user',
        'city',
        'country',
        'created_date',
    )


class PickupAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'user',
        'pickup_date',
        'pickup_time',
        'city',
        'country',
    )


admin.site.register(Region, RegionAdmin)
admin.site.register(Branch, BranchAdmin)
admin.site.register(Postage, PostageAdmin)
admin.site.register(UserAccountDetails, UserAccountDetailsAdmin)
admin.site.register(Shipment, ShipmentAdmin)
admin.site.register(ShipmentImport, ImportShipmentAdmin)
admin.site.register(PackageType, PackageTypeAdmin)
admin.site.register(PackageTypeOption, PackageTypeOptionAdmin)
admin.site.register(Batch, BatchAdmin)
admin.site.register(PrepPackShip, PrepPackShipAdmin)
admin.site.register(Pickup, PickupAdmin)
admin.site.register(WhyBuyBox)
admin.site.register(Blog)
admin.site.register(BlogDetail)