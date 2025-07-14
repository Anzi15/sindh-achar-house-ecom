"use client"
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import AnimatedDiv from "./AnimatedDiv";

export default function TestimonialSlider({ testimonials =  [
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
]
}) {
  return (
    <>
<section className="w-full max-w-[98vw] py-4 cursor-grab">
  <h3 className="text-3xl uppercase m-auto font-semibold max-w-fit text-center">Reviews</h3>
  <div className="mx-auto lg:max-w-6xl px-3">
    <Carousel
      opts={{
        loop: true,
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <AnimatedDiv>
              <div className="flex flex-col px-4 py-5 sm:p-6">
                <q className="flex-1 text-gray-600 dark:text-gray-300">
                  {testimonial.quote}
                </q>

                {/* 5 stars */}
                <div className="flex mt-4 gap-1 text-yellow-800">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} fill="currentColor" stroke="currentColor" size={20} />
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <span className="inline-flex rounded-full">
                    <Image
                      className="h-10 w-10 rounded-full"
                      height={40}
                      width={40}
                      alt={testimonial.name}
                      src={testimonial.imgSrc}
                      loading="lazy"
                    />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </div>
</section>
    </>
  );
}
