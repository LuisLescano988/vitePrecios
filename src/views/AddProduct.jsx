import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postNewProduct } from '../redux/actions';

const AddProduct = () => {

    const dispatch = useDispatch();

    const [productData, setProductData] = useState({
        product_name: '',
        supplier_code: '',
        messure_unit: '',
        quantity: '',
        purchase_price: '',
        sales_price: '',
        percent: '',
        purchase_date: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'percent') {
            const purchasePrice = parseFloat(productData.purchase_price);
            const margin = parseFloat(value);

            if (!isNaN(purchasePrice) && !isNaN(margin)) {
                const salesPrice = purchasePrice + (purchasePrice * margin) / 100;
                setProductData({
                    ...productData,
                    [name]: value,
                    sales_price: salesPrice.toFixed(2),
                });
                return;
            }
        }

        if (name === 'sales_price') {
            const purchasePrice = parseFloat(productData.purchase_price);
            const newSalesPrice = parseFloat(value);

            if (!isNaN(purchasePrice) && !isNaN(newSalesPrice) && purchasePrice !== 0) {
                const margin = ((newSalesPrice - purchasePrice) / purchasePrice) * 100;
                setProductData({
                    ...productData,
                    percent: margin.toFixed(2),
                    [name]: value,
                });
                return;
            }
        }

        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postNewProduct(productData));
        setProductData({
            product_name: '',
            supplier_code: '',
            messure_unit: '',
            quantity: '',
            purchase_price: '',
            sales_price: '',
            percent: '',
            purchase_date: ''
        });
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className='p-8 max-w-md shadow-md rounded-md'>
                <h1 className=' text-3xl font-bold mb-4'>AGREGAR PRODUCTO</h1>
                <form className=' grid grid-cols-2 gap-4' onSubmit={handleSubmit}>
                    <div>

                        <label className='block mb-2'>
                            Nombre de Producto:
                            <input
                                type="text"
                                name="product_name"
                                value={productData.product_name}
                                onChange={handleInputChange}
                                placeholder='Ingrese un producto'
                                className="border border-gray-400 p-2 w-full text-black placeholder:italic"
                            />
                        </label>
                        <br />
                        <label className='block mb-2'>
                            Código de Proveedor:
                            <input
                                type="text"
                                name="supplier_code"
                                value={productData.supplier_code}
                                onChange={handleInputChange}
                                placeholder='Ingrese un proveedor'
                                className="border border-gray-400 p-2 w-full text-black placeholder:italic"
                            />
                        </label>
                        <br />
                        <label className='block mb-2'>
                            Unidad de Medida:
                            <select
                                name="messure_unit"
                                value={productData.messure_unit}
                                onChange={handleInputChange}
                                className="border border-gray-400 p-2 w-full text-black"
                            >
                                <option value="mts">Metros</option>
                                <option value="kgs">Kilogramos</option>
                                <option value="unidad">Unidad</option>
                            </select>
                        </label>
                        <br />
                        <label className='block mb-2'>
                            Cantidad:
                            <input
                                type="number"
                                name="quantity"
                                value={productData.quantity}
                                onChange={handleInputChange}
                                className="border border-gray-400 p-2 w-full text-black"
                            />
                        </label>
                        <br />
                    </div>
                    <div>

                        <label className='block mb-2'>
                            Precio de compra:
                            <input
                                type="number"
                                name="purchase_price"
                                value={productData.purchase_price}
                                onChange={handleInputChange}
                                className="border border-gray-400 p-2 w-full text-black"
                            />
                        </label>
                        <br />
                        <label className='block mb-2'>
                            Precio de venta:
                            <input
                                type="number"
                                name="sales_price"
                                value={productData.sales_price}
                                onChange={handleInputChange}
                                className="border border-gray-400 p-2 w-full text-black"
                            />
                        </label>
                        <br />
                        <label className='block mb-2'>
                            Margen de venta:
                            <input
                                type="number"
                                name="percent"
                                value={productData.percent}
                                onChange={handleInputChange}
                                className="border border-gray-400 p-2 w-full text-black"
                            />
                        </label>
                        <br />
                        <label className='block mb-2'>
                            Fecha de compra:
                            <input
                                type="date"
                                name="purchase_date"
                                value={productData.purchase_date}
                                onChange={handleInputChange}
                                className="border border-gray-400 p-2 w-full text-black"
                            />
                        </label>
                        <br />
                    </div>
                    <button className=' col-span-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700' type="submit">Agregar Producto</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct