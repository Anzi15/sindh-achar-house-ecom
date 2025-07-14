import { FiTruck } from "react-icons/fi";
import { PiPackage } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";
import { FaWhatsapp } from "react-icons/fa";
import AnimatedDiv from "./AnimatedDiv";

const benefits = [
  {
    icon: <FiTruck className="text-5xl" />,
    title: "Fast Nationwide Delivery",
    description: "Enjoy fresh homemade aachar delivered straight to your doorstep, anywhere in Pakistan.",
  },
  {
    icon: <PiPackage className="text-5xl" />,
    title: "Fresh & Preservative-Free",
    description: "Our aachars are made with 100% natural ingredients, free from artificial preservatives.",
  },
  {
    icon: <TfiWorld className="text-5xl font-thin" />,
    title: "Traditional Recipes, Modern Hygiene",
    description: "We follow authentic homemade recipes while maintaining the highest hygiene standards.",
  },
  {
    icon: <FaWhatsapp className="text-5xl" />,
    title: "Custom Orders & Bulk Requests",
    description: "Need a special blend or a bulk order? Message us on WhatsApp for personalized service.",
  },
];

const CustomerBenefits = () => {
  return (
    <section className="bg-[#F6F6F0] min-h-[20rem] flex items-center overflow-hidden relative">
      <div className="flex overflow-x-auto md:overflow-hidden snap-x snap-mandatory gap-6 w-full min-h-[20rem] ">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex min-w-full md:min-w-[20%] flex-col items-center text-center justify-center text-brandBrown gap-4 snap-center"
          >
            <AnimatedDiv>{benefit.icon}</AnimatedDiv>
            <AnimatedDiv><h2 className="text-xl font-bold">{benefit.title}</h2></AnimatedDiv>
            <AnimatedDiv><p className=" ">{benefit.description}</p></AnimatedDiv>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerBenefits;
