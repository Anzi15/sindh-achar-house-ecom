import { collection, doc, getDoc, getDocs, limit } from "firebase/firestore";

import React from 'react'
import ProductCardGroup from './ProductCardGroup';
import { db } from "../lib/firebase/firbaseConfig";

const ProductSuggestions = async({dontUse, heading}) => {
    const docs = await getDocs(collection(db, "Products"),limit(5));
    const products = [];
  
    docs.forEach((doc) => {
        if(dontUse !== doc.data().title && products.length < 4){
            products.push({...doc.data(), id:doc.id});
        }
    });
  return (
    <ProductCardGroup products={products} groupHeading={heading}/>
  )
}

export default ProductSuggestions
