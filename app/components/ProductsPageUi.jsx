"use client"
import React from 'react'
import ProductCardGroup from './ProductCardGroup'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'

const ProductsPageUi = ({products}) => {
    const [style, setStyle] = useState("short")
  return (
    <div>
      
      <div className="sticky bg-yellow-50 py-2 w-full my-4 flex items-center justify-end gap-2 px-4 md:hidden">

<button className={`text-white text-2xl h-full aspect-square rounded transition-all px-2 ${style == "short" ? "bg-gray-800" : "bg-gray-400"}`} onClick={()=>{setStyle("short")}}>
<GiHamburgerMenu />
</button>

<button className={`rotate-90 transition-all text-white text-2xl px-2 ${style == "long" ? "bg-gray-800" : "bg-gray-400"} rounded aspect-square`} onClick={()=>{setStyle("long")}}>
<GiHamburgerMenu />

</button>
</div>
<div className="products-list">
<ProductCardGroup products={products} style={style} />
</div>
    </div>
  )
}

export default ProductsPageUi
