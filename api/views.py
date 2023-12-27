from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_204_NO_CONTENT
from .models import Product
from .serializers import ProductSerializer

class ProductView(APIView):
    #function for get all books from db
    def get(self, request):
            all_products = Product.objects.all()
            serializers = ProductSerializer(all_products, many=True)
            return Response(serializers.data)
    #function for post books in db
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    
class ProductDetailView(APIView):

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            raise HTTP_404_NOT_FOUND
    #function for get a product by id
    def get(self, request, pk):
            product = self.get_object(pk)
            serializer_product = ProductSerializer(product, many=False)
            return Response(serializer_product.data)
    #function for update a product by id
    def put(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    #function for delete a product by id
    def delete(self, request, pk):
        product = self.get_object(pk)
        product.delete()
        return Response(status=HTTP_204_NO_CONTENT)