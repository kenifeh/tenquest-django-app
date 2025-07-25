# Generated by Django 4.1.2 on 2022-10-26 11:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_useraccountdetails_is_agree_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shipment',
            name='address1',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='city',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='country',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='currency',
            field=models.CharField(blank=True, choices=[('1', 'CAD'), ('2', 'USD'), ('3', 'EUR')], max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='email',
            field=models.EmailField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='has_postage',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='is_agree',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='package_content',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='package_height',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='package_length',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='package_size_unit',
            field=models.CharField(blank=True, choices=[('1', 'in'), ('2', 'cm')], max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='package_weight',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='package_weight_unit',
            field=models.CharField(blank=True, choices=[('1', 'lbs'), ('2', 'kg'), ('3', 'g'), ('4', 'oz')], max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='package_width',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='phone',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='postage_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.postage'),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='postal_code',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='shipment',
            name='retail_value',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
