# Generated by Django 3.0.3 on 2020-03-16 22:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0005_hotel_location_desc'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='location_desc',
            field=models.TextField(),
        ),
    ]
