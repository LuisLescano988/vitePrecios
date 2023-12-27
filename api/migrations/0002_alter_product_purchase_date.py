# Generated by Django 4.2.2 on 2023-12-22 14:42

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='purchase_date',
            field=models.DateField(validators=[django.core.validators.MinValueValidator(limit_value=datetime.date(2023, 1, 1)), django.core.validators.MaxValueValidator(limit_value=datetime.date(2023, 12, 22))]),
        ),
    ]