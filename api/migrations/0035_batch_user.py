# Generated by Django 4.1.2 on 2023-09-14 06:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0034_remove_batch_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='batch',
            name='user',
            field=models.ForeignKey(default=47, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
