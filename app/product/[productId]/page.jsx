/* eslint-disable react/no-unescaped-entities */

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase/firbaseConfig";
import ProductImgsCarousel from "@/app/components/ProductImgsCarousel";
import ProductPageUi from "@/app/components/ProductPageUi";
import HtmlRenderer from "@/app/components/HtmlRenderer";
import Image from "next/image";
import CustomerBenefits from "@/app/components/CustomerBenefits";
import TestimonialSlider from "@/app/components/testimonials-slider";
import ProductSuggestions from "@/app/components/ProductSuggestions";

export async function generateMetadata({ params }) {
  const productDoc = await getDoc(doc(db, "Products", params.productId));
  const productData = { ...productDoc.data(), id: productDoc.id };

  const title = `${productData.title} | Best Home made shikarpuri achar `;
  const description = productData.description;

  return {
    title,
    description,
  };
}

export default async function ProductsPage({ params }) {
  const productDoc = await getDoc(doc(db, "Products", params.productId));
  const productData = { ...productDoc.data(), id: productDoc.id };

  return (
    <>
      <main className="flex justify-evenly w-full md:flex-row flex-col relative h-full">
        <ProductImgsCarousel
          className=" md:max-h-[565px] md:max-w-[445px] md:gap-8"
          parsedProductImages={JSON.stringify([
            productData?.primaryImg,
            productData?.secondary1Img,
            productData?.secondary2Img,
          ])}
        />
        <ProductPageUi parsedProduct={JSON.stringify(productData)} />
      </main>

      <div className="description px-8 md:py-[8rem] py-[5rem]">
        <h3 className="text-left">
          <b>Description</b>
        </h3>
        {<HtmlRenderer rawHtml={productData.descriptionHtml} />}
      </div>

      <div className="bg-yellow-900 w-full overflow-hidden object-center flex items-center relative justify-center aspect-video flex-col p-8 gap-4 md:min-h-fit min-h-[20rem]">
        <Image
          className="opacity-50 w-full object-cover h-full absolute inset-0 z-[1]"
          src={"/pickle-bottle.jpg"} // Change to an aachar-related image
          alt="Homemade Aachar"
          width={2144}
          height={1072}
        />
        <h1 className="z-[2] md:text-5xl text-3xl text-white font-bold font-serif">
          The Taste of Tradition
        </h1>
        <p className="z-[1] text-gray-100 md:w-[35%]">
          Experience the authentic flavors of homemade aachars, crafted with the
          finest ingredients and traditional recipes.
        </p>
      </div>

      <TestimonialSlider bgColor="yellow-600" textColor="black" />

      {/* Section: Why Our Aachar? */}
      <div className="flex justify-center md:flex-row flex-col-reverse my-12">
        <div className="md:w-1/2 w-full flex flex-col md:items-end p-10 gap-8 justify-center">
          <h1 className="md:text-4xl text-left text-3xl font-bold text-brandRed md:w-[80%]">
            Handcrafted with Love & Tradition
          </h1>
          <p className="text-left md:w-[80%]">
            Our aachars are made using time-tested recipes, pure ingredients,
            and the perfect blend of spices. No preservatives, just pure
            homemade goodness.
          </p>
        </div>
        <div className="md:w-1/2 w-screen flex justify-center items-center">
          <Image
            src={"/home made achar.jpg"} // Change to an aachar-related image
            className="md:w-[80%] w-[90%] rounded-lg"
            alt="Homemade Aachar"
            width={640}
            height={640}
          />
        </div>
      </div>

      <CustomerBenefits />

      {/* Section: Quality Ingredients */}
      <div className="flex w-[98%] justify-center py-9 flex-wrap md:px-4">
        <Image
          src={"/chutney.jpg"} // Change to an aachar-related image
          className="md:w-1/2 object-cover rounded-lg w-[90%] aspect-video"
          width={1280}
          height={828}
          alt="Organic Aachar Ingredients"
        />
        <div className="md:w-1/2 w-full flex flex-col md:items-end p-10 gap-8 justify-center">
          <h1 className="md:text-4xl text-left text-3xl font-bold text-brandRed md:w-[80%] w-full">
            Pure & Organic Ingredients
          </h1>
          <p className="text-left md:w-[80%]">
            We use fresh, organic vegetables and high-quality spices to ensure
            that every jar of aachar is full of natural flavor and goodness.
          </p>
        </div>
      </div>

      

      <ProductSuggestions
        heading="You might also like:"
        dontUse={productData.title}
      />
    </>
  );
}
