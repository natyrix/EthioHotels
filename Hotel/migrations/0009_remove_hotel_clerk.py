# Generated by Django 3.0.3 on 2020-06-10 04:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0008_hotelclerk'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hotel',
            name='clerk',
        ),
    ]
