import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../redux/actions";

const SearchComponent = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    const productsPerPage = 20
    const [currentPage, setCurrentPage] = useState(1);
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;

    const handlerPrevPage = () => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    };

    const handlerNextPage = () => {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
    };

    const handlerFirstPage = () => {
        setCurrentPage((currentPage) => currentPage - (currentPage - 1));
    };

    const handlerLastPage = () => {
        setCurrentPage((currentPage) => totalPages);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const totalPages = Math.ceil(
        (allProducts.length ? allProducts.length : 0) / productsPerPage
    );

    const [search, setSearch] = useState('');

    const getFilteredProducts = (search, allProducts) => {
        if (!search) {
            return allProducts
        }
        return allProducts.filter((product) =>
            product.product_name.toLowerCase().includes(search) ||
            product.supplier_code.toLowerCase().includes(search)
        )
    };

    const filteredProducts = getFilteredProducts(search, allProducts);
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // useEffect(() => {
    // }, [allProducts]);
    
    useEffect(() => {
        setCurrentPage(1);
        dispatch(getAllProducts());
    }, []);

    return (
        <div className=" h-screen">
            <div className="">
                <h1 className=" text-5xl">Listado de Productos</h1>
            </div>
            <div className=" mt-6">
                <input type="text" className=' text-black w-4/5 text-center italic rounded-sm' placeholder='Ingrese un código, nombre de producto o proveedor para su busqueda.' onChange={(event) => setSearch(event.target.value)} />
            </div>
            <div className=" px-2">
                <table className=" text-left mt-8 w-full">
                    <thead className="">
                        <tr>
                            <th colSpan="2">Nombre</th>
                            <th colSpan="1">Codigo</th>
                            <th colSpan="1">Proveedor</th>
                            <th colSpan="1">Precio de compra</th>
                            <th colSpan="1">Precio de venta</th>
                            <th colSpan="1">Margen de venta</th>
                            <th colSpan="1">Venta por</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {currentProducts.map((product) => (
                            <tr className=" text-sm  border-b-2 hover:bg-green-800" key={product.id}>
                                <td colSpan="2" className="font-bold ">{product.product_name}</td>
                                <td className="">{product.supplier_code}</td>
                                <td className="">{product.supplier_name}</td>
                                <td className=" text-center">${product.purchase_price}</td>
                                <td className=" text-center">${product.sales_price}</td>
                                <td className="text-center">{product.percent}%</td>
                                <td className="text-right">{product.messure_unit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className=" bottom-0 fixed left-1/2 mb-2 transform flex items-center space-x-2">
                <button className="pagination-button" onClick={handlerFirstPage} disabled={currentPage === 1}>
                    Ir al inicio
                </button>
                <button className="pagination-button" onClick={handlerPrevPage} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span className=" mr-2 text-white"> {currentPage} de {totalPages}</span>
                <button className="pagination-button" onClick={handlerNextPage} disabled={currentPage === totalPages}>
                    Siguiente
                </button>
                <button className="pagination-button" onClick={handlerLastPage} disabled={currentPage === totalPages}>
                    Ir al final
                </button>
            </div>
        </div>
    )
}

export default SearchComponent;