# Generated by Django 3.0.3 on 2020-07-14 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Hotel', '0012_auto_20200701_0851'),
    ]

    operations = [
        migrations.AddField(
            model_name='hotel',
            name='is_reg_completed',
            field=models.BooleanField(default=False),
        ),
    ]