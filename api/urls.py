from django.urls import path
from .views import ProductView, ProductDetailView

urlpatterns = [
    path('all_products/', ProductView.as_view(), name='all_products'),
    path('all_products/<int:pk>', ProductDetailView.as_view(), name='detail_product'),
]