from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.validators import EmailValidator
from .models import Shipment, UserAccountDetails, ShipmentImport, Address, Batch, PrepPackShip, Branch, Region, Pickup


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'email': {'validators': [EmailValidator,]}, 'password': {'write_only': True}}
        

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], 
                                        validated_data['email'], 
                                        validated_data['password'], 
                                        first_name=validated_data['first_name'], 
                                        last_name=validated_data['last_name'])

        return user

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'first_name','last_name')

# Change Password


class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = (
            'id',
            'region',
            'name'
        )
        depth=1

class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = (
            'id',
            'name'
        )

class UserAccountDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountDetails
        fields = (
            'id',
            'user',
            'full_name',
            'company_name',
            'address_line1',
            'address_line2',
            'city',
            'postal_code',
            'province',
            'country',
            'phone',
            'contact_email',
            'weekly_package_count',
            'region',
            'branch',
            'is_agree',
            'product_type',
            'promotional_code',
            'hear_about_us',
            'is_verified',
            'has_active_ups_account',
        )


class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = (
            'id',
            'user',
            'name',
            'address1',
            'address2',
            'city',
            'country',
            'province',
            'postal_code',
            'phone',
            'tax_id',
            'email',
            'has_postage',
            'is_cross_border',
            'shipment_status',
            'package_content',
            'package_description',
            'package_type',
            'package_type_option',
            'retail_value',
            'currency',
            'package_weight',
            'package_weight_unit',
            'order_id',
            'package_length',
            'package_width',
            'package_height',
            'package_size_unit',
            'is_agree',
            'shipment_code',
            'tracking_code',
            'postage_type',
            'package_type',
            'created_date',
            'postage_rate',
            'tax',
            'shipment_amount',
            'payment_method',
            'payment_id',
        )


class ImportShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipmentImport
        fields = (
            'id',
            'user',
            'file_name',
            'file_path',
            'time_stamp',
        )


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = (
            'id',
            'address',
            'city',
            'province',
            'country',
            'postal_code',
        )


class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = (
            'id',
            'name',
            'batch_id',
            'user',
            'shipments',
            'created_date',
        )
        depth = 1

class BatchSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = (
            'id',
            'name',
            'batch_id',
            'user',
            'shipments',
            'created_date',
        )

class PrepPackShipSerializer(serializers.ModelSerializer):

    class Meta:
        model = PrepPackShip
        fields = (
            'id',
            'user',
            'name',
            'address',
            'city',
            'province',
            'country',
            'postal_code',
            'tracking_number',
            'package_description',
            'service_type',
            'service_type_option',
            'prep_instruction',
            'package_weight',
            'package_weight_unit',
            'package_length',
            'package_width',
            'package_height',
            'package_dimensions_unit',
            'quantity',
            'has_shipment',
            'shipment',
            'price_with_shipment',
            'price_without_shipment',
            'payment_id',
            'payment_method',
            'is_paid',
            'is_packed',
            'created_date',
        )


class PickupSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pickup
        fields = (
            'id',
            'user',
            'name',
            'address1',
            'address2',
            'city',
            'province',
            'country',
            'postal_code',
            'phone',
            'pickup_date',
            'pickup_time',
            'instruction',
            'package_weight',
            'package_weight_unit',
            'package_length',
            'package_width',
            'package_height',
            'package_dimensions_unit',
        )
