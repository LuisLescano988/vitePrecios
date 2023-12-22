from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import date

class Product(models.Model):
    product_name = models.CharField(max_length=150, blank=False, null=False)
    supplier_code = models.CharField(max_length=150, blank=False, null=False)
    supplier_name = models.CharField(max_length=150, blank=False, null=False)
    messure_unit = models.CharField(max_length=30, blank=False, null=False)
    quantity = models.IntegerField(validators=[MaxValueValidator(200000), MinValueValidator(1)], blank=False, null=False)
    purchase_price = models.IntegerField(validators=[MaxValueValidator(10000000), MinValueValidator(1)])
    sales_price = models.IntegerField(validators=[MaxValueValidator(10000000), MinValueValidator(1)])
    percent = models.IntegerField(validators=[MaxValueValidator(1000), MinValueValidator(1)])
    purchase_date = models.DateField(validators=[MinValueValidator(limit_value=date(2023, 1, 1)), MaxValueValidator(limit_value=date.today())])



    def __str__(self):
        return f'{self.product_name} {self.supplier_code}'
    