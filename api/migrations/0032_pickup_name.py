# Generated by Django 4.1.2 on 2023-02-09 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0031_alter_shipment_postage_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='pickup',
            name='name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
