import React, { useState } from 'react'
import SearchComponent from './SearchComponent'
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';

const Home = () => {
  const [activeTab, setActiveTab] = useState('buscar');

  const renderComponent = () => {
    switch (activeTab) {
      case 'buscar':
        return <SearchComponent />;
      case 'agregar':
        return <AddProduct />;
      case 'actualizar':
        return <UpdateProduct />;
      case 'borrar':
        return <DeleteProduct />;
      default:
        return null;
    }
  }

  return (
    <div className=' flex justify-end'>
      <div className=' flex flex-col h-screen fixed left-0 w-2/12'>
        <button className={`h-1/4 ${activeTab === 'buscar' ? 'bg-zinc-800 underline text-xl' : 'bg-black'} transition-all duration-300 hover:bg-gray-700`}
          onClick={() => setActiveTab('buscar')}>Buscar</button>
        <button className={`h-1/4 ${activeTab === 'agregar' ? 'bg-zinc-800 underline text-xl' : 'bg-black'} transition-all duration-300 hover:bg-gray-700`}
          onClick={() => setActiveTab('agregar')}>Agrega un producto</button>
        <button className={`h-1/4 ${activeTab === 'actualizar' ? 'bg-zinc-800 underline text-xl' : 'bg-black'} transition-all duration-300 hover:bg-gray-700`}
          onClick={() => setActiveTab('actualizar')}>Actualizar producto</button>
        <button className={`h-1/4 ${activeTab === 'borrar' ? 'bg-zinc-800 underline text-xl' : 'bg-black'} transition-all duration-300 hover:bg-gray-700`}
          onClick={() => setActiveTab('borrar')}>Borrar producto</button>
      </div>
      <div className=' bg-zinc-800 w-10/12'>
        {renderComponent()}
      </div>
    </div>
  )
}

export default Home;