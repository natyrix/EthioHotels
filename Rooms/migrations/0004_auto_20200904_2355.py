# Generated by Django 3.0.3 on 2020-09-04 23:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0015_auto_20200903_1225'),
        ('Rooms', '0003_auto_20200904_2349'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='roomtype',
            unique_together={('room_type', 'price', 'hotel')},
        ),
    ]
