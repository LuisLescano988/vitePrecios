import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products);

  const productsPerPage = 10
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
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    (allProducts.length ? allProducts.length : 0) / productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
   <div>
    <h1>Product List</h1>
      <ul>
        {currentProducts.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlerFirstPage} disabled={currentPage === 1}>
          First Page
        </button>
        <button onClick={handlerPrevPage} disabled={currentPage === 1}>
          Prev Page
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handlerNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
        <button onClick={handlerLastPage} disabled={currentPage === totalPages}>
          Last Page
        </button>
      </div>
   </div>
  )
}

export default Home;