import React, { useState } from "react";
import { useProductStore } from "../Store/Products";

const Cards = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { updateProduct } = useProductStore();
  const { deleteProduct } = useProductStore();

  const handleOpenModal = (product) => {
    setUpdatedProduct({ ...product }); // Create a copy to avoid mutation
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setUpdatedProduct(null);
    setIsModalOpen(false); // Close the modal
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    if (!updatedProduct) {
      console.error("Updated product data is invalid.");
      return;
    }

    try {
      const { success, message } = await updateProduct(pid, updatedProduct); // Update product in store/database
      if (success) {
        setIsModalOpen(false); // Close modal after successful update
        console.log("Product updated successfully!");
      } else {
        console.log(message); // Error message in case of failure
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      console.log("Product deleted successfully!");
    } else {
      console.log(message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-9 mr-10">
      <div className="card bg-base-300 w-75 lg:w-96 h-[500px] shadow-xl border ">
        <figure className="h-[50%] overflow-hidden border">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
        </figure>
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title">{product.name}</h2>
          <p>$ {product.price}</p>
          <div className="card-actions justify-end">
            {/* Edit Item Button */}
            <button
              className="btn btn-primary border-none"
              onClick={() => handleOpenModal(product)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>

            {/* Modal - Rendered Conditionally */}
            {isModalOpen && (
              <dialog open className="modal">
                <div className="modal-box">
                  {/* Close Button */}
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    ✕
                  </button>
                  {/* Modal Content */}
                  {updatedProduct && (
                    <>
                      <h3 className="font-bold text-lg">Edit Product</h3>
                      <div>
                        <label className="input input-bordered flex items-center gap-2">
                          Name
                          <input
                            type="text"
                            className="grow"
                            placeholder="Enter Product Name"
                            name="name"
                            value={updatedProduct.name || ""}
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      <div>
                        <label className="input input-bordered flex items-center gap-2">
                          Price
                          <input
                            type="text"
                            className="grow"
                            placeholder="Enter Product Price"
                            name="price"
                            value={updatedProduct.price || ""}
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      <div>
                        <label className="input input-bordered flex items-center gap-2">
                          Image
                          <input
                            type="text"
                            className="grow"
                            placeholder="Enter Product Image"
                            name="image"
                            value={updatedProduct.image || ""}
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      {/* Close Button */}
                      <div className="flex justify-end gap-3">
                        <button
                          className="btn btn-primary mt-4"
                          onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-secondary mt-4"
                          type="button"
                          onClick={handleCloseModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </dialog>
            )}

            {/* Delete Item Button */}
            <button
              className="btn btn-primary hover:bg-red-700 hover:text-white border-none"
              onClick={() => handleDeleteProduct(product._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
