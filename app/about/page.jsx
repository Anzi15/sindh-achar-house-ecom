import React from "react";
import Image from "next/image";
import AnimatedDiv from "../components/AnimatedDiv";
import CustomerBenefits from "../components/CustomerBenefits";
import TestimonialSlider from "../components/testimonials-slider";
import FaqsSection from "../components/FaqsSection";

const page = () => {
  return (
    <main>
      <AnimatedDiv>
        <section className="bg-white dark:bg-gray-900">
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 text-left">
            <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Authentic Shikarpuri Achars by Sindh Achar
              </h2>
              <p>
                Experience the bold, traditional flavors of Shikarpuri Achars,
                crafted with age-old recipes and the finest ingredients. Each
                jar brings a burst of tangy, spicy, and savory goodness to your
                meals.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 select-none">
              <Image
                className="w-full skeleton-loading rounded-lg min-h-[17rem]"
                src="/pickle-bottle.jpg"
                alt="Traditional Shikarpuri Achar"
                width={640}
                height={854}
              />
              <Image
                className="mt-4 w-full min-h-[17rem] skeleton-loading lg:mt-10 object-cover rounded-lg"
                src="/home made achar.jpg"
                alt="Best Pakistani Pickles"
                width={640}
                height={854}
              />
            </div>
          </div>
        </section>
      </AnimatedDiv>

      <AnimatedDiv>
        <section className="w-full flex py-10 items-center justify-between md:flex-row flex-col flex-wrap md:gap-0 gap-6">
          <div className="md:w-1/2 w-[95%] text-center">
            <h2 className="text-2xl font-bold uppercase text-brandOrange py-2 text-center">
              Premium Ingredients
            </h2>
            <p className="text-lg font-normal text-center">
              We use high-quality spices and fresh vegetables for the best
              flavor.
            </p>
          </div>
          <div className="md:w-1/2 w-[95%] text-center">
            <Image
              src="https://i.ibb.co/s932FJ9C/image.png"
              alt="Premium Achar Ingredients"
              height={428}
              width={639}
              className="aspect-video rounded-lg object-cover"
            />
          </div>
        </section>
      </AnimatedDiv>

      {/* <AnimatedDiv>
        <section className="bg-white dark:bg-gray-900 p-5 px-10 flex justify-center my-10">
          <div className="md:w-[40%] w-full flex flex-col py-4 gap-6">
            <h2 className="text-3xl font-bold uppercase text-brandOrange">
              What Makes Our Achars Special?
            </h2>
            <p className="text-lg font-normal">
              Our Shikarpuri Achars are made using handpicked spices and
              sun-dried vegetables, ensuring the authentic taste you love.
              Crafted with traditional techniques, they are free from
              preservatives and full of rich, natural flavors.
            </p>
          </div>
        </section>
      </AnimatedDiv> */}



      <AnimatedDiv>
        <section className="w-full flex py-10 items-center justify-between md:flex-row flex-col-reverse flex-wrap md:gap-0 gap-6 md:pl-6">
          <div className="md:w-1/2 w-[95%] text-center">
            <Image
              src="https://i.ibb.co/99SbCh4D/image.png"
              alt="Traditional Achar Making"
              height={428}
              width={639}
              className="aspect-video rounded-lg object-cover"
            />
          </div>
          <div className="md:w-1/2 w-[95%] text-center">
            <h2 className="text-2xl font-bold uppercase text-brandOrange py-2">
              Traditional Preparation
            </h2>
            <p className="text-lg font-normal">
              Our Achars are prepared using time-honored methods for maximum
              authenticity.
            </p>
          </div>
        </section>
      </AnimatedDiv>

      <AnimatedDiv>
        <CustomerBenefits />
      </AnimatedDiv>

      <AnimatedDiv>
        <TestimonialSlider bgColor="#575761" />
      </AnimatedDiv>

      <AnimatedDiv>
        <FaqsSection />
      </AnimatedDiv>
    </main>
  );
};

export default page;
