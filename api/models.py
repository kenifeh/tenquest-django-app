import random

from django.db import models
from django.dispatch import receiver
from django.urls import reverse
from django.utils.text import slugify
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.contrib.auth.models import User


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'),
                                                   reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )


class Region(models.Model):
    name = models.CharField(null=True, blank=True, max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Regions"


class Branch(models.Model):
    region = models.ForeignKey("api.Region", on_delete=models.CASCADE)
    name = models.CharField(null=True, blank=True, max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Branches"


class Postage(models.Model):
    postage_type = models.CharField(null=False, blank=False, max_length=100, primary_key=True)
    rate = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return self.postage_type

    class Meta:
        verbose_name_plural = "Postages"


class Address(models.Model):
    address = models.CharField(null=True, blank=True, max_length=300)
    city = models.CharField(null=False, blank=False, max_length=50)
    province = models.CharField(null=True, blank=True, max_length=50)
    country = models.CharField(null=False, blank=False, max_length=50)
    postal_code = models.CharField(null=False, blank=False, max_length=50)

    def __str__(self):
        return self.address

    class Meta:
        verbose_name_plural = "Addresses"


class UserAccountDetails(models.Model):
    weekly_package_choices = (
        ("1", "1-10"),
        ("2", "11-50"),
        ("3", "51-200"),
        ("4", "200+"),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(null=True, blank=True, max_length=50)
    company_name = models.CharField(null=True, blank=True, max_length=50)
    address_line1 = models.CharField(null=False, blank=False, max_length=150)
    address_line2 = models.CharField(null=True, blank=True, max_length=150)
    city = models.CharField(null=False, blank=False, max_length=50)
    postal_code = models.CharField(null=False, blank=False, max_length=50)
    province = models.CharField(null=True, blank=True, max_length=50)
    country = models.CharField(null=False, blank=False, max_length=50)
    phone = models.CharField(max_length=20, null=True, blank=True)
    contact_email = models.EmailField(null=False, blank=False, max_length=50)
    weekly_package_count = models.CharField(max_length=50, choices=weekly_package_choices)
    region = models.ForeignKey("api.Region", on_delete=models.CASCADE, null=False, blank=False)
    branch = models.ForeignKey("api.Branch", on_delete=models.CASCADE, null=False, blank=False)
    return_address = models.ForeignKey(Address, null=True, blank=True, on_delete=models.SET_NULL)
    is_agree = models.BooleanField(null=True, blank=True, default=False)
    product_type = models.TextField(null=False, blank=False)
    promotional_code = models.CharField(null=True, blank=True, max_length=50)
    hear_about_us = models.CharField(null=True, blank=True, max_length=100)
    is_verified = models.BooleanField(null=True, blank=True, default=False)
    has_active_ups_account = models.BooleanField(null=False, blank=False, default=False)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name_plural = "User Account Details"


class ShippingUser(models.Model):
    shipper_type = (
        ('shipper', 'Shipper'),
        ('recipient', 'Recipient'),
    )
    type = models.CharField(choices=shipper_type, default="shipper", max_length=9)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(null=True, blank=True, max_length=50)
    address = models.CharField(null=True, blank=True, max_length=150)
    city = models.CharField(null=True, blank=True, max_length=50)
    province = models.CharField(null=True, blank=True, max_length=50)
    country = models.CharField(null=True, blank=True, max_length=50)
    postal_code = models.CharField(null=True, blank=True, max_length=50)
    phone = models.CharField(null=True, blank=True, max_length=15)

    def __str__(self):
        return self.name + ' - ' + self.type

    class Meta:
        verbose_name_plural = "Shipping Users"


class PackageType(models.Model):
    name = models.CharField(max_length=100, primary_key=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Package Types"


class PackageTypeOption(models.Model):
    title = models.CharField(primary_key=True, max_length=200)
    package_type = models.ForeignKey(PackageType, max_length=100, on_delete=models.CASCADE)
    description = models.CharField(null=True, blank=True, max_length=300)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Package Type Options"


class Shipment(models.Model):
    currency_choices = (
        ("CAD", "CAD"),
        ("USD", "USD"),
        ("EUR", "EUR"),
    )
    package_weight_unit_choices = (
        ("lbs", "lbs"),
        ("kg", "kg"),
        ("g", "g"),
        ("oz", "oz"),
    )
    package_size_unit_choices = (
        ("in", "in"),
        ("cm", "cm"),
    )

    status_choices = (
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("in_transit", "In Transit"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
        ("failed", "Failed"),
    )

    payment_method_choices = (
        ("stripe", "Stripe"),
        ("paypal", "Paypal"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(null=True, blank=True, max_length=50)
    address1 = models.CharField(null=True, blank=True, max_length=150)
    address2 = models.CharField(null=True, blank=True, max_length=150)
    city = models.CharField(null=True, blank=True, max_length=50)
    country = models.CharField(max_length=50)
    province = models.CharField(null=True, blank=True, max_length=50)
    postal_code = models.CharField(null=True, blank=True, max_length=50)
    phone = models.CharField(max_length=20, null=True, blank=True)
    tax_id = models.CharField(null=True, blank=True, max_length=50)
    email = models.EmailField(null=True, blank=True, max_length=50)
    has_postage = models.BooleanField(null=True, blank=True)
    is_cross_border = models.BooleanField(null=True, blank=True)
    shipment_status = models.CharField(choices=status_choices, max_length=50, default='pending', null=False)
    package_content = models.CharField(null=True, blank=True, max_length=100)
    package_description = models.CharField(null=True, blank=True, max_length=250)
    package_type = models.ForeignKey(PackageType, max_length=100, on_delete=models.SET_NULL, null=True, blank=True)
    package_type_option = models.ForeignKey(PackageTypeOption, max_length=200, on_delete=models.SET_NULL, null=True,
                                            blank=True)
    retail_value = models.IntegerField(null=True, blank=True)
    currency = models.CharField(max_length=50, choices=currency_choices, null=True, blank=True)
    package_weight = models.IntegerField(null=True, blank=True)
    package_weight_unit = models.CharField(max_length=50, choices=package_weight_unit_choices, null=True, blank=True)
    order_id = models.IntegerField(null=True, blank=True)
    package_length = models.IntegerField(null=True, blank=True)
    package_width = models.IntegerField(null=True, blank=True)
    package_height = models.IntegerField(null=True, blank=True)
    package_size_unit = models.CharField(max_length=50, choices=package_size_unit_choices, null=True, blank=True)
    is_agree = models.BooleanField(null=True, blank=True)
    shipment_code = models.CharField(null=True, blank=True, max_length=50)
    tracking_code = models.CharField(null=True, blank=True, max_length=50)
    postage_type = models.CharField(null=True, blank=True, max_length=100)
    is_paid = models.BooleanField(null=True, blank=True, default=False)
    is_completed = models.BooleanField(null=True, blank=True, default=False)
    created_date = models.DateTimeField(auto_now_add=True, blank=True)
    postage_rate = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    tax = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    shipment_amount = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    payment_id = models.CharField(null=True, blank=True, max_length=300)
    payment_method = models.CharField(choices=payment_method_choices, null=True, blank=True, max_length=50)
    is_deleted = models.BooleanField(null=True, blank=True, default=False)

    def __str__(self):
        return self.name or ''

    class Meta:
        verbose_name_plural = "Shipments"


class Pickup(models.Model):
    package_weight_unit_choices = (
        ('kg', 'kg'),
        ('lbs', 'lbs')
    )
    package_dimensions_unit_choices = (
        ('in', 'in'),
        ('cm', 'cm')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    address1 = models.CharField(null=False, blank=False, max_length=150)
    address2 = models.CharField(null=True, blank=True, max_length=150)
    city = models.CharField(null=False, blank=False, max_length=50)
    country = models.CharField(null=False, blank=False, max_length=50)
    province = models.CharField(null=True, blank=True, max_length=50)
    postal_code = models.CharField(null=False, blank=False, max_length=50)
    phone = models.IntegerField(null=False, blank=False)
    is_default = models.BooleanField(null=True, blank=True)
    pickup_date = models.DateField(null=False, blank=False)
    pickup_time = models.TimeField(null=False, blank=False)
    instruction = models.TextField(null=True, blank=True)
    shipment = models.ForeignKey(Shipment, on_delete=models.CASCADE, null=True)
    package_weight = models.IntegerField(null=True, blank=True)
    package_weight_unit = models.CharField(max_length=50, choices=package_weight_unit_choices, null=True, blank=True)
    package_length = models.IntegerField(null=True, blank=True)
    package_width = models.IntegerField(null=True, blank=True)
    package_height = models.IntegerField(null=True, blank=True)
    package_dimensions_unit = models.CharField(max_length=50, choices=package_dimensions_unit_choices, null=True,
                                               blank=True)
    created_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.user.username + " (" + str(self.pickup_date) + " " + str(self.pickup_time) + ")"

    class Meta:
        verbose_name_plural = "Pickups"


class ShipmentImport(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file_name = models.CharField(max_length=100, null=False, blank=False)
    file_path = models.URLField(max_length=200, null=True, blank=True)
    time_stamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_name

    class Meta:
        verbose_name_plural = "Shipment Imports"


class Batch(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    batch_id = models.CharField(max_length=7, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    shipments = models.ManyToManyField(Shipment)
    created_date = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return self.batch_id

    class Meta:
        verbose_name_plural = "Batches"

    @staticmethod
    def get_batch_id():
        batch_id = str(random.randint(1000000, 9999999))
        while Batch.objects.filter(batch_id=batch_id).exists():
            batch_id = str(random.randint(1000000, 9999999))
        return batch_id


class PrepPackShip(models.Model):
    package_weight_unit_choices = (
        ('kg', 'kg'),
        ('lbs', 'lbs')
    )

    package_dimensions_unit_choices = (
        ('in', 'in'),
        ('cm', 'cm')
    )

    payment_method_choices = (
        ('stripe', 'Stripe'),
        ('paypal', 'Paypal'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=20)
    province = models.CharField(max_length=20)
    country = models.CharField(max_length=20)
    postal_code = models.CharField(max_length=10)
    tracking_number = models.CharField(max_length=20)
    package_description = models.CharField(max_length=200, null=True, blank=True)
    service_type = models.CharField(max_length=100)
    service_type_option = models.CharField(max_length=50, null=True, blank=True)
    prep_instruction = models.CharField(max_length=200, null=True, blank=True)
    package_weight = models.IntegerField(null=True, blank=True)
    package_weight_unit = models.CharField(max_length=50, choices=package_weight_unit_choices, null=True, blank=True)
    package_length = models.IntegerField(null=True, blank=True)
    package_width = models.IntegerField(null=True, blank=True)
    package_height = models.IntegerField(null=True, blank=True)
    package_dimensions_unit = models.CharField(max_length=50, choices=package_dimensions_unit_choices, null=True,
                                               blank=True)
    quantity = models.PositiveSmallIntegerField(default=1)
    has_shipment = models.BooleanField(default=False)
    shipment = models.ForeignKey(Shipment, on_delete=models.SET_NULL, null=True, blank=True)
    price_with_shipment = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    price_without_shipment = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    payment_id = models.CharField(null=True, blank=True, max_length=300)
    payment_method = models.CharField(choices=payment_method_choices, max_length=10, null=True, blank=True)
    is_paid = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    is_packed = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Prep Pack & Ship"


class WhyBuyBox(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True, max_length=50)
    message = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Why Buybox"


class Blog(models.Model):
    email = models.EmailField(null=True, blank=True, max_length=50)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Blog"


class BlogDetail(models.Model):
    tab_choices = (('tab1', 'Blog Home'), ('tab2', 'News & Announcements'), ('tab3', 'Ecommerce Tips'),
                   ('tab4', 'Shipping & Fulfillment'), ('tab5', 'Marketplace Strategies'),
                   ('tab6', 'Customer Spotlights'))
    tab = models.CharField(max_length=50, choices=tab_choices, default='tab1')
    main_title = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    author = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "BlogDetail"
