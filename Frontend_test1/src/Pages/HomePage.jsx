import React, { useEffect } from 'react';
import { useProductStore } from '../Store/Products';
import Cards from '../Components/Cards';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { fetchProduct, products } = useProductStore();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  console.log("Products", products);

  return (
    <div className="bg-slate-300 dark:bg-slate-900 w-screen min-h-screen pt-9">
      {/* Toast Container */}
      <ToastContainer />
      <div className='flex pl-4 items-center justify-center text-2xl md:text-4xl  text-gray-900  dark:text-white mb-4 '>
        Welcome to My Store 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:ml-2 w-8 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </div>
      {/* Conditionally Render Content */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-700 dark:text-gray-300 h-screen">
          <img 
            className="w-16 h-16" 
            src="/emoji.png" 
            alt="Empty Store" 
          />                
          <h2 className="text-xl font-semibold">Oops,</h2>
          <h2 className="text-xl font-semibold">The store is empty!</h2>
          <p className="mt-4">Start by adding a new product.</p>
          <Link to="/create">
            <button className="btn btn-primary text-white mt-4 bg-blue-700 hover:bg-blue-950"> Create New Product</button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 pl-9">
          {products.map((product) => (
            <Cards key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
