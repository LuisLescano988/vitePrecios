import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, updateProduct } from '../redux/actions';
import { useNavigate } from 'react-router-dom'

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [confirmation, setConfirmation] = useState(false);
    const [newData, setNewData] = useState({
        product_name: '',
        supplier_code: '',
        supplier_name: '',
        messure_unit: '',
        quantity: '',
        purchase_price: '',
        sales_price: '',
        percent: '',
        purchase_date: ''
    })

    const getFilteredProducts = (search, allProducts) => {
        if (!search) {
            return []
        }
        return allProducts.filter((product) =>
            product.product_name.toLowerCase().includes(search) ||
            product.supplier_code.toLowerCase().includes(search)
        )
    };

    const filteredProducts = getFilteredProducts(search, allProducts);


    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    const handleRowClick = (product) => {
        setSelectedProduct(product);
        setNewData({
            product_name: product.product_name,
            supplier_code: product.supplier_code,
            supplier_name: product.supplier_name,
            messure_unit: product.messure_unit,
            quantity: product.quantity,
            purchase_price: product.purchase_price,
            sales_price: product.sales_price,
            percent: product.percent,
            purchase_date: product.purchase_date
        })
    };

    const handleCancelUpdate = () => {
        setConfirmation(false);
        setSelectedProduct(null);
    };

    const handleConfirmedUpdate = async (product) => {
        try {
            setConfirmation(true);
        } catch (error) {
            console.error('Error al actualizar el producto', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'percent') {
            const purchasePrice = parseFloat(newData.purchase_price);
            const margin = parseFloat(value);

            if (!isNaN(purchasePrice) && !isNaN(margin)) {
                const salesPrice = purchasePrice + (purchasePrice * margin) / 100;
                setNewData({
                    ...newData,
                    [name]: value,
                    sales_price: salesPrice.toFixed(2),
                });
                return;
            }
        }

        if (name === 'sales_price') {
            const purchasePrice = parseFloat(newData.purchase_price);
            const newSalesPrice = parseFloat(value);

            if (!isNaN(purchasePrice) && !isNaN(newSalesPrice) && purchasePrice !== 0) {
                const margin = ((newSalesPrice - purchasePrice) / purchasePrice) * 100;
                setProductData({
                    ...newData,
                    percent: margin.toFixed(2),
                    [name]: value,
                });
                return;
            }
        }

        setNewData({
            ...newData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateProduct(selectedProduct.id, newData));
        setNewData({
            product_name: '',
            supplier_code: '',
            supplier_name: '',
            messure_unit: '',
            quantity: '',
            purchase_price: '',
            sales_price: '',
            percent: '',
            purchase_date: ''
        });
    }

    return (
        <div className=' bg-black h-screen'>
            {!confirmation ?
                <div>
                    <div className=" pt-8">
                        <p className=' text-5xl'>Busque el producto que desea actualizar.</p>
                        <input type="text" className=' text-black w-4/5 text-center italic rounded-sm mt-3' placeholder='Ingrese un código, nombre de producto o proveedor para su busqueda.' onChange={(event) => setSearch(event.target.value)} />
                    </div>
                    {search && (
                        <div>
                            <table className=" text-left mt-8 w-full">
                                <thead className="">
                                    <tr>
                                        <th colSpan="1">Nombre</th>
                                        <th colSpan="1">Codigo</th>
                                        <th colSpan="1">Precio de compra</th>
                                        <th colSpan="1">Precio de venta</th>
                                        <th colSpan="1">Margen de venta</th>
                                        <th colSpan="1">Venta por</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {filteredProducts.map((product) => (
                                        <tr className=" text-sm  border-b-2 hover:bg-green-800" key={product.id} onClick={() => { handleRowClick(product) }}>
                                            <td className="font-bold ">{product.product_name}</td>
                                            <td className="">{product.supplier_code}</td>
                                            <td className="">{product.purchase_price}</td>
                                            <td className="">{product.sales_price}</td>
                                            <td className="">{product.percent}%</td>
                                            <td className="">{product.messure_unit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {selectedProduct && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                            <div className="bg-white p-4 rounded-md">
                                <p className="text-xl mb-4 text-black">¿Realmente desea actualizar este producto?</p>
                                <button className="bg-green-500 text-white py-2 px-4 rounded mr-2" onClick={handleConfirmedUpdate}>
                                    Sí, actualizar
                                </button>
                                <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={handleCancelUpdate}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}
                </div> :
                <div>
                    <form className=' grid grid-cols-2 gap-4' onSubmit={handleSubmit}>
                        <div>

                            <label className='block mb-2'>
                                Nombre de Producto:
                                <input
                                    type="text"
                                    name="product_name"
                                    value={newData.product_name}
                                    onChange={handleInputChange}
                                    placeholder={newData.product_name}
                                    className="border border-gray-400 p-2 w-full text-black placeholder:italic"
                                />
                            </label>
                            <br />
                            <label className='block mb-2'>
                                Código de Proveedor:
                                <input
                                    type="text"
                                    name="supplier_code"
                                    value={newData.supplier_code}
                                    onChange={handleInputChange}
                                    placeholder={newData.supplier_code}
                                    className="border border-gray-400 p-2 w-full text-black placeholder:italic"
                                />
                            </label>
                            <br />
                            <label className='block mb-2'>
                                Nombre del Proveedor:
                                <input
                                    type="text"
                                    name="supplier_name"
                                    value={newData.supplier_name}
                                    onChange={handleInputChange}
                                    placeholder={newData.supplier_name}
                                    className="border border-gray-400 p-2 w-full text-black placeholder:italic"
                                />
                            </label>
                            <br />
                            <label className='block mb-2'>
                                Unidad de Medida:
                                <select
                                    name="messure_unit"
                                    value={newData.messure_unit}
                                    onChange={handleInputChange}
                                    className="border border-gray-400 p-2 w-full text-black"
                                >
                                    <option value="">{newData.messure_unit}</option>
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
                                    value={newData.quantity}
                                    onChange={handleInputChange}
                                    placeholder={newData.quantity}
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
                                    value={newData.purchase_price}
                                    onChange={handleInputChange}
                                    placeholder={newData.purchase_price}
                                    className="border border-gray-400 p-2 w-full text-black"
                                />
                            </label>
                            <br />
                            <label className='block mb-2'>
                                Precio de venta:
                                <input
                                    type="number"
                                    name="sales_price"
                                    value={newData.sales_price}
                                    onChange={handleInputChange}
                                    placeholder={newData.sales_price}
                                    className="border border-gray-400 p-2 w-full text-black"
                                />
                            </label>
                            <br />
                            <label className='block mb-2'>
                                Margen de venta:
                                <input
                                    type="number"
                                    name="percent"
                                    value={newData.percent}
                                    onChange={handleInputChange}
                                    placeholder={newData.percent}
                                    className="border border-gray-400 p-2 w-full text-black"
                                />
                            </label>
                            <br />
                            <label className='block mb-2'>
                                Fecha de compra:
                                <input
                                    type="text"
                                    name="purchase_date"
                                    value={newData.purchase_date}
                                    onChange={handleInputChange}
                                    placeholder={newData.purchase_date}
                                    className="border border-gray-400 p-2 w-full text-black"
                                />
                            </label>
                            <br />
                        </div>
                        <button className=' col-span-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'
                            type="submit">Agregar Producto</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default UpdateProduct