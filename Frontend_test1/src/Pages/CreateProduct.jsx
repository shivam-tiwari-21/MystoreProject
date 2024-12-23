import React, { useState } from 'react';
import { useProductStore } from '../Store/Products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (success) {
      toast.success(message || "Product created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      toast.error(message || "Failed to create product. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
    <div className='flex items-center  bg-slate-300 dark:bg-slate-900 justify-center  text-2xl md:text-4xl text-gray-900  dark:text-white pt-9 '>Welcome to My Store <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 w-8 h-10 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
 </div>
      <div className="w-screen h-screen flex bg-slate-300 dark:bg-slate-900 items-center justify-center">
        <div className="w-full max-w-sm h-auto p-6 rounded-lg shadow-md 
                      sm:w-1/3 sm:h-2/3 flex flex-col justify-center gap-4 border bg-base-100 dark:bg-base-300">
          <div className="text-2xl text-white text-center mb-4">Create a New Product</div>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Name:
              <input
                type="text"
                className="grow"
                placeholder="Enter Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Price:
              <input
                type="text"
                className="grow"
                placeholder="Enter Product Price"
                name="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Image:
              <input
                type="text"
                className="grow"
                placeholder="Enter Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </label>
          </div>
          <button className="btn btn-primary" onClick={handleAddProduct}>
            Submit
          </button>
          <Link to="/"><span className='text-sm text-blue-500 underline'>Go to Home</span>
          </Link>
                </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default CreateProduct;
