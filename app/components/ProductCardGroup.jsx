"use client"

import AnimatedDiv from "./AnimatedDiv"
import ProductCard from "./ProductCard"
import Link from "next/link"

const ProductCardGroup = ({ products, groupHeading = null, loading, link = null, style = "short" }) => {
  const productArray =
    products && products.length > 0
      ? products
      : [
          {
            id: 1,
            title: "meow",
            price: 200,
            primaryImg:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
          },
          {
            id: 2,
            title: "meow",
            price: 200,
            primaryImg:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
          },
          {
            id: 3,
            title: "meow",
            price: 200,
            primaryImg:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
          },
          {
            id: 4,
            title: "meow",
            price: 200,
            primaryImg:
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/640px-HD_transparent_picture.png?alt=media&token=6b3789c8-da36-47ad-b36a-b2dfe62eb984",
          },
        ]

  // Reverse the product array to display the second row first
  const reversedProductArray = [...productArray].reverse()

  return (
    <div className="my-12 px-8 ">
      {/* Conditional rendering for group heading */}
      <div className="w-full flex justify-center text-center ">
        {groupHeading && <h3 className="text-3xl uppercase  font-semibold max-w-fit text-center">{groupHeading}</h3>}

      </div>
      <div className={`w-full grid lg:grid-cols-4 gap-3 ${style === "short" ? "grid-cols-2" : "grid-cols-1"}`}>
        {reversedProductArray.map((product) => (
          <AnimatedDiv key={product.id}>
            <ProductCard
              onClick={() => {
                window.scrollTo(0, 0)
              }}
              loading={loading}
              price={product.price}
              title={product.title}
              image1={product.primaryImg}
              link={`/product/${product.id}`}
              comparePrice={product.comparePrice}
              productData={product}
            />
          </AnimatedDiv>
        ))}
      </div>
    </div>
  )
}

export default ProductCardGroup

