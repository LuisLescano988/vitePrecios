from rest_framework.serializers import ModelSerializer
from .models import Product

class ProductSerializer(ModelSerializer):

    class Meta:
        model = Product
        fields= [
            'id',
            'product_name', 
            'supplier_code', 
            'supplier_name', 
            'messure_unit', 
            'quantity', 
            'purchase_price', 
            'sales_price', 
            'percent', 
            'purchase_date', 
        ]