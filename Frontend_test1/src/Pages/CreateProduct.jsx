import React, { useState } from 'react'
import { useProductStore } from '../Store/Products';

const CreateProduct = () => {

const[newProduct,setNewProduct]=useState({
  name:"",
  price:"",
  image:"",
});
const {createProduct}=useProductStore();
const handleAddProduct= async()=>  { 
  const {success,message} = await createProduct(newProduct);
  console.log("Success: ",success);
  console.log("Message",message);
};
  return (
    <>
      <div><label className="input input-bordered flex items-center gap-2">
  Name
  <input type="text" className="grow" placeholder="Enter Product Name" name='name' value={newProduct.name}
  onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})} />
</label></div>
<div><label className="input input-bordered flex items-center gap-2">
  Price
  <input type="text" className="grow" placeholder="Enter Product Price" name='price' value={newProduct.price}
  onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})} />
</label></div>
<div><label className="input input-bordered flex items-center gap-2">
  Image
  <input type="text" className="grow" placeholder="Enter Image URL" name='image' value={newProduct.image}
  onChange={(e)=>setNewProduct({...newProduct,image:e.target.value})} />
</label></div>
<button className="btn btn-primary" onClick={handleAddProduct}>Submit</button>
    </>
  )
}

export default CreateProduct