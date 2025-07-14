import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase/firbaseConfig";
import ProductCardGroup from "../../components/ProductCardGroup";
export default async function ProductsPage({ params }) {
  const productsQuery = query(
    collection(db, "Products"),
    where("tags", "array-contains", params.collectionName)
  );
  const docs = await getDocs(productsQuery);
  const products = [];

  docs.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id, key: doc.id });
  });

  return (
    <>
      <div className="px-10 pt-10 flex w-full justify-between items-center">
        <h1 className="text-[3rem] text-left uppercase">
          {params.collectionName}
        </h1>
      </div>

      {products.length > 0 ? (
        <div className="products-list">
          <ProductCardGroup products={products} />
        </div>
      ) : (
        <div className="px-10 pt-10">
          <h1 className="text-[3rem] text-left">
            No product found for {params.collectionName}
          </h1>
        </div>
      )}
    </>
  );
}

