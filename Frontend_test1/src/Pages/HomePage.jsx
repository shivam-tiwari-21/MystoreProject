import React, { useEffect } from 'react'
import { useProductStore } from '../Store/Products'
import Cards from '../Components/Cards';

const HomePage = () => {
  const {fetchProduct,products}=useProductStore();
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);
  console.log("Products",products);

  return (
    <div>
      {/* Grid */}
      <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 pl-9">
    {products.map((product) => (
      <Cards key={product._id} product={product}/>
    ))}
</div>
    </div>
  )
}

export default HomePage