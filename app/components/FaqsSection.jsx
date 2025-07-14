"use client";
import React, { useState } from "react";

const FaqsSection = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          <div className="w-full lg:w-1/3">
            <img
              src="https://i.ibb.co/Gf4mNrPW/image.png"
              alt="FAQ section"
              draggable={false}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              className="skeleton-loading max-h-[80vw] aspect-[9/16] w-full rounded-xl select-none object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-xl">
              <div className="mb-6 lg:mb-16">
                <h6 className="text-lg text-center font-medium text-brandOrange mb-2 lg:text-left">
                  FAQs
                </h6>
                <h2 className="text-4xl text-center font-bold text-gray-900 leading-[3.25rem] mb-5 lg:text-left">
                  Have questions about Sindh Achar?
                </h2>
              </div>
              <div className="accordion-group text-left">
                {[
                  {
                    question: "What kind of food does Sindh Achar House offer?",
                    answer:
                      "Sindh Achar House offers a variety of delicious and hygienic meals, including fast food, traditional dishes, and healthy options made with fresh ingredients.",
                  },
                  {
                    question: "How can I place an order?",
                    answer:
                      "You can place an order through our website, mobile app, or by calling our customer service. We ensure quick and reliable delivery to your doorstep.",
                  },
                  {
                    question: "Do you offer home delivery?",
                    answer:
                      "Yes! Sindh Achar House provides fast and safe home delivery services. Check our delivery coverage on our website for more details.",
                  },
                  {
                    question: "Are your ingredients fresh?",
                    answer:
                      "Absolutely! We prioritize fresh and high-quality ingredients to ensure the best taste and health benefits for our customers.",
                  },
                  {
                    question: "Do you have special meal deals?",
                    answer:
                      "Yes! We regularly offer special meal deals and discounts. Follow us on social media or subscribe to our newsletter to stay updated.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`accordion py-8 border-b border-solid border-gray-200 ${
                      activeAccordion === index ? "active" : ""
                    }`}
                  >
                    <button
                      className="accordion-toggle group inline-flex items-center justify-between md:text-xl text-lg font-normal leading-8 text-gray-600 w-full transition duration-500 hover:text-brandOrange accordion-active:text-indigo-600 accordion-active:font-medium focus-within::text-brandOrange"
                      onClick={() => toggleAccordion(index)}
                      aria-controls={`accordion-content-${index}`}
                    >
                      <h5>{item.question}</h5>
                      <svg
                        className={`text-gray-900 transition duration-500 group-hover:text-brandOrange accordion-active:text-indigo-600 ${
                          activeAccordion === index ? "rotate-180" : ""
                        }`}
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </button>
                    <div
                      id={`accordion-content-${index}`}
                      className={`accordion-content w-full px-0 overflow-hidden pr-4 ${
                        activeAccordion === index ? "max-h-40" : "max-h-0"
                      }`}
                      aria-labelledby={`accordion-heading-${index}`}
                    >
                      <p className="text-base text-gray-500 font-normal">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqsSection;