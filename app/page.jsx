import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { db } from "./lib/firebase/firbaseConfig";
import ProductCardGroup from "./components/ProductCardGroup";
import CollectionCardGroup from "./components/CollectionCardGroup";
import CustomerBenefits from "./components/CustomerBenefits";
import TestimonialSlider from "./components/testimonials-slider";
import AutoCarousel from "./components/CollectionCarousel";
import AnimatedDiv from "./components/AnimatedDiv";

export async function generateMetadata() {
  const title = `Best Achars in Pakistan | Sindh Achar House`;

  return {
    title,
    description:
      "Looking for some delicious achar in Pakistan? Check out our top picks and reviews to the perfect taste that suits your taste buds!",
  };
}

export default async function Home() {
  const topProducts = [];
  const bestSeller = [];
  const newArrival = [];
  const scentfulSavings = [];

  const testimonials =  [
  {
    quote:
      "Sindh Achar House ka taste lajawab hai! Perfect balance of spices, and the quality is top-notch. As a nutritionist, I fully recommend it for its purity and flavor.",
    name: "Dr. Areeba Shaikh",
    role: "Nutrition Specialist",
    imgSrc: "https://i.ibb.co/Nd8ccpbS/image.png",
  },
  {
    quote:
      "Ma Sha Allah kamaal ka taste! Maine mix achar order kiya tha relatives ko chakhnay diya, unho ne turant rakh liya, mujhe theek se taste bhi nahi karne diya. Is liye maine dobara order kiya!",
    name: "Rabia Khan",
    role: "Homemaker",
    imgSrc: "https://i.ibb.co/0jD3Pt9n/image.png",
  },
  {
    quote:
      "Best and most flavorful achar & chutney! I'm genuinely obsessed. Ramzan mein toh aur bhi zabardast lagta hai. Without hesitation, try from Sindh Achar House!",
    name: "Sana F.",
    role: "Achar Lover",
    imgSrc: "https://i.ibb.co/bRFxvgsW/image.png",
  },
  {
    quote:
      "Sindh Achar House is a rising star! Their dedication to taste, freshness, and beautiful packaging stands out. With more reach, they can easily become a household name across Pakistan.",
    name: "Hina Kamal",
    role: "Marketing Consultant",
    imgSrc: "https://i.ibb.co/RG1SmHG6/image.png",
  },
  {
    quote:
      "One of the best achars I’ve ever tried 😍 Spices 10/10, packaging 10/10, and overall amazing quality! I’ll definitely keep coming back. Highly recommended!",
    name: "Komal J.",
    role: "Food Reviewer",
    imgSrc: "https://i.ibb.co/BKTzKxZ1/480324448-614243678140461-3056309638179870596-n.jpg",
  },
  {
    quote:
      "Assalamualaikum! Maine Sindh Achar House se mix achar order kiya tha – zabardast taste, achi packing aur reasonable price! Aap bhi try karein 😍",
    name: "Ahmed Raza",
    role: "Customer",
    imgSrc: "https://i.ibb.co/TBJPYHyM/363344303-2224176651304288-965764869529267900-n.jpg",
  },
  {
    quote:
      "Mashallah, lehsan, mix, hari mirch, aur kathi meethi achaar sab hi lajawab hain! Pakistan mein agar best achar chahiye toh Sindh Achar House se behtar koi nahi. 10/10 ❤️",
    name: "Authentic Taste",
    role: "Food Blogger",
    imgSrc: "https://i.ibb.co/B5n1wz2t/468301608-122140721096434009-7070898920464045465-n.jpg",
  },
  {
    quote:
      "زبردست ذائقہ! مکس اچار میں ہر سبزی کا بہترین امتزاج ہے اور لہسن والا تو خاص طور پر بہت مزیدار ہے۔ کھانے کے ساتھ لاجواب لگتا ہے۔ ڈیلیوری تیز اور پیکنگ بھی شاندار۔ لازمی آزمائیں۔",
    name: "Fahad Shaikh",
    role: "Satisfied Buyer",
    imgSrc: "https://i.ibb.co/b5f3xfKf/453178253-471506465671661-2781666950760530985-n.png",
  },
];

  const topProductsQuery = query(
    collection(db, "Products"),
    where("tags", "array-contains", "top-products") // Apply the `where` clause
    // Order by `topProductOrder`
  );

  const topProductsDocs = await getDocs(topProductsQuery);
  topProductsDocs.forEach((document) => {
    topProducts.push({ ...document.data(), id: document.id });
  });

  console.log(topProducts);

  const scentfulSavingsQuery = query(
    collection(db, "Products"),
    where("tags", "array-contains", "scentful-savings"),
    limit(4) // Apply the `where` clause within `query`
  );
  const scentfulSavingsDocs = await getDocs(scentfulSavingsQuery);
  scentfulSavingsDocs.forEach((document) => {
    scentfulSavings.push({ ...document.data(), id: document.id });
  });

  return (
    <main>
      <div className="w-screen flex items-center justify-center">
        <Image
          src="/home made achar.jpg"
          alt="Website Cover"
          className="aspect-video w-full skeleton-loading"
          layout="responsive"
          width={1280}
          height={720}
          priority
        />
      </div>

      <ProductCardGroup
        products={topProducts}
        groupHeading={"Top Products"}
        link={"/products"}
        upsideDown={true} // Pass the new prop to reverse the order
      />

      <AutoCarousel />

      <section className="w-full flex flex-col md:flex-row items-center py-4">
        <div className="md:w-1/2 text-center md:text-left space-y-4  md:px-12 px-4">
          <AnimatedDiv>
            <h2 className="text-2xl font-bold">
              Pakistan's Leading Pickles & Condiments Brand
            </h2>
          </AnimatedDiv>
          <AnimatedDiv>
            <p className="text-lg text-gray-700">
              Experience the rich, authentic flavors of Pakistan with our
              premium pickles and condiments—crafted to perfection for every
              meal.
            </p>
          </AnimatedDiv>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/logo.svg"
            width={720}
            height={720}
            className="w-full max-w-sm"
            alt="Brand Logo"
          />
        </div>
      </section>

      <CustomerBenefits />

      <div className="relative bg-black text-white p-6 rounded-lg">
        <div className="flex md:flex-row flex-col justify-center items-center gap-4">
          <AnimatedDiv>
            <div className="relative md:w-1/2">
              <Image
                src="https://i.ibb.co/1G319NN8/59926c85448ea.png" // Change to actual image path
                alt="Man holding sample set"
                className="w-full aspect-video object-cover rounded-lg"
                width={720}
                height={720}
              />
            </div>
          </AnimatedDiv>

          {/* Right Side - Text & Buttons */}

          <AnimatedDiv>
            <div className="text-center md:text-left items-center flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                DON'T KNOW WHERE TO START?
              </h2>
              <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-4">
                <a
                  href="https://wa.me/923047210222?text=AOA"
                  className="bg-white text-black font-semibold px-6 py-3 rounded-full"
                >
                  Talk to us
                </a>
                <Link
                  href={"/product/mix-achar."}
                  className="bg-white text-black font-semibold px-6 py-3 rounded-full"
                >
                  Try Mix achar
                </Link>
              </div>
            </div>
          </AnimatedDiv>
        </div>
      </div>

      <TestimonialSlider testimonials={testimonials} />

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <AnimatedDiv>
          <h2 className="text-3xl font-bold text-gray-800">
            100+ Best Achars & Condiments in Pakistan by Sindh Achar House
          </h2>
        </AnimatedDiv>

        <AnimatedDiv>
          <p className="text-gray-700 text-lg">
            Sindh Achar House is your go-to online store for the finest selection of
            achars, chutneys, and condiments, crafted with authentic flavors and
            high-quality ingredients. We take pride in offering traditional,
            homemade-style pickles that bring the perfect balance of spice,
            tang, and aroma to your meals.
          </p>
        </AnimatedDiv>

        <AnimatedDiv>
          <p className="text-gray-700 text-lg">
            Our collection includes a diverse range of achars, sauces, and
            spreads, ensuring that every taste preference is catered to. Whether
            you're looking for a fiery kick to your dishes or a rich, flavorful
            accompaniment, Sindh Achar House has something for everyone. From classic
            mango achar to exotic mixed pickles, our products are made using
            traditional recipes, preserving the rich heritage of Pakistani
            flavors.
          </p>
        </AnimatedDiv>

        <AnimatedDiv>
          <p className="text-gray-700 text-lg">
            Branded achars and condiments have become increasingly expensive due
            to inflation and import costs, but at Sindh Achar House, we prioritize
            affordability without compromising on quality. Our secret lies in
            sourcing the best local ingredients and optimizing our processes to
            deliver fresh, preservative-free products at unbeatable prices.
          </p>
        </AnimatedDiv>
      </div>
    </main>
  );
}
