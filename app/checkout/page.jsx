"use client";
import React, { useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import { v4 as uuidv4 } from "uuid";
import InputField from "../components/InputField";
import { IoCheckmarkSharp } from "react-icons/io5";
import PromoCodeForm from "../components/PromoCodeForm";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Timestamp } from "firebase/firestore";

import {
  setDoc,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase/firbaseConfig";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const paymentMethods = [
  {
    icon: "/cod.webp",
    name: "Cash on Delivery",
    context: "Purchase goods, pay when they arrive",
    identifier: "COD",
  },
  {
    icon: "/Jazz cash logo vector.webp",
    name: "JazzCash",
    context:
      "Send your payment to JazzCash on this number: <a class='text-light-blue-800' href='https://wa.me/9203047210222?text=Hi, please guide me i want to pay using jazzcash for a order on your website' target='_blank'>03337210227</a>, and <a class='text-light-blue-800' href='https://wa.me/923323947336?text=Hi, please guide me i want to share my payment receipt' target='_blank'> send us a screenshot </a>",
    identifier: "JZC",
  },
  {
    icon: "/easypaisa.webp",
    name: "EasyPaisa",
    context:
      "Send your payment to easypaisa on this number: <a class='text-light-blue-800' href='https://wa.me/923047210222?text=Hi, please guide me i want to pay using easypasia for a order on your website' target='_blank'>03337210227</a>, and <a class='text-light-blue-800' target='_blank' href='https://wa.me/923047210222?text=Hi, please guide me i share my screenshot with you of my payment'> send us a screenshot </a>",
    identifier: "EZP",
  },
  {
    icon: "/bank.webp",
    name: "Bank Transfer",
    context:
      "UBL Bank  <br/> IBAN Number: <b> PK04 UNIL 0109 0003 1207 0863 </b> <br/>  <a class='text-light-blue-800' target='_blank' href='https://wa.me/923047210222?text=Hi, please guide me i share my screenshot with you of my payment'> send us a screenshot </a>",
    identifier: "BT",
  },
];

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const quantity = searchParams.get("quantity");
  const coupon = searchParams.get("coupon");
  const selectedVariantIndex = searchParams.get("selectedVariantIndex");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [cartItemsLoading, setCartItemsLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(null);
  const [total, setTotal] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [calculationsLoading, setCalculationsLoading] = useState(true);
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
  const orderConfirmationRef = useRef(null);
  const [allProductTags, setAllProductTags] = useState([]);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState(null);
  const [shippingFees, setShippingFees] = useState(null);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  const [couponCodeApplied, setCouponCodeApplied] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  const getDiscountValue = (value, type, coupon_code_applied) => {
    setCouponCodeApplied(coupon_code_applied);
    if (type) {
      if (type == "amount") {
        setDiscountValue(value);
      } else if (type == "percentage") {
        const discountedPrice = subTotal * (1 - value / 100);
        setDiscountValue(Math.round(subTotal - discountedPrice));
      }
    }
  };

  useEffect(() => {
    setCalculationsLoading(true);
    let subtotal = 0;
    products.forEach((product) => {
      subtotal += JSON.parse(product.selectedVariant.price) * product.quantity;
    });
    setSubTotal(subtotal);
    setShippingFees(0);
    setCalculationsLoading(false);
  }, [products]);

  useEffect(() => {
    const storedCartItems =
      JSON.parse(localStorage.getItem("cart-items")) || [];
    if (storedCartItems) {
      setCartItems(storedCartItems);
      setCartItemsLoading(false);
    }
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      setProductsLoading(true);
      if (source == "cart") {
        if (cartItems?.length) {
          let subtotal = 0;
          const productTags = [];
          cartItems.forEach((item) => {
            subtotal +=
              parseInt(item.selectedVariant.price) * parseInt(item.quantity);
            productTags.push(item.tags);
          });
          setProducts([...cartItems]);
          setSubTotal(subtotal);
          const shipping_fees = subtotal > 1500 ? 0 : 300;
          setShippingFees(shipping_fees);
          setAllProductTags(productTags);
        } else {
          if (cartItemsLoading) return;
          router.push(`/cart`);
          return;
        }
      } else {
        try {
          const productDocRef = doc(db, "Products", source);
          const productSnapshot = await getDoc(productDocRef);
          const productData = productSnapshot.data();
          setProducts([
            {
              productId: source,
              quantity: parseInt(quantity),
              selectedVariant: productData.variants[selectedVariantIndex],
              product: productData,
            },
          ]);
        } catch (error) {
          router.push(`/`);
          return;
        }
      }
      if (coupon) {
        setCouponCodeApplied(coupon);
      }
      setProductsLoading(false);
    };

    getProducts();
  }, [source, quantity, coupon, selectedVariantIndex, cartItems, router]);

  useEffect(() => {
    if (subTotal !== null && shippingFees !== null) {
      setTotal(subTotal + shippingFees - discountValue);
    }
  }, [subTotal, shippingFees, discountValue]);

  function generateOrderId(length = 8) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let orderId = "";
    for (let i = 0; i < length; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmissionLoading(true);
    const orderData = {
      orderId: generateOrderId(),
      customer: {
        firstName,
        lastName,
        phoneNumber,
        shippingAddress: {
          street: address,
          city,
          state,
        },
      },
      createdAt: Timestamp.fromDate(new Date()),
      status: "pending",
      items: [...products],
      payment: {
        method: paymentMethod,
        amount: total,
        currency: "PKR",
      },
      subTotalAmount: subTotal,
      discounts: [
        {
          code: couponCodeApplied,
          amount: discountValue,
        },
      ],
      shippingFees,
      grandTotal: total,
    };

    try {
      await setDoc(doc(db, "orders", orderData.orderId), orderData);
      if (discountValue > 0) {
        const q = query(
          collection(db, "coupons"),
          where("couponCode", "==", couponCodeApplied)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming there's only one document with this couponCode
          const docRef = doc(db, "coupons", querySnapshot.docs[0].id);
          const docSnap = querySnapshot.docs[0];

          const docSnapData = docSnap.data();

          // Increment the usedCount field
          const updatedUsedCount = (docSnapData.usedCount || 0) + 1;

          // Update the document with the new usedCount
          await updateDoc(docRef, {
            usedCount: updatedUsedCount,
          });
        }
      }
      if (source == "cart") localStorage.removeItem("cart-items");
      // toast.success("Your order has been placed");

      // Format the date from the Timestamp
      // const orderDate = orderData.createdAt.toDate().toLocaleDateString();

      // Construct the URL with all relevant order parameters
      await fetch("/api/sendAdminEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      toast.success("Your order has been placed");

      // Construct the URL
      const orderDate = orderData.createdAt.toDate().toLocaleDateString();
      const confirmationUrl =
        `/order/confirmed?` +
        `orderId=${orderData.orderId}` +
        `&paymentMethod=${orderData.payment.method}` +
        `&name=${encodeURIComponent(
          orderData.customer.firstName + " " + orderData.customer.lastName
        )}` +
        `&date=${encodeURIComponent(orderDate)}` +
        `&total=${orderData.grandTotal}` +
        `&items=${orderData.items.length}`;

      // Set the href of the hidden link
      orderConfirmationRef.current.href = confirmationUrl;

      // Simulate a click
      orderConfirmationRef.current.click();
    } catch (error) {
      console.log("there a error");
      console.log(error);
    } finally {
      setIsSubmissionLoading(false);
    }
  };

  return (
    <>
      <header className=" py-8 text-center bg-white border-b-4">
        <h1 className="text-4xl">Sindh Achar</h1>
      </header>
      <main className="w-full bg-[#f1faee] py-10 flex md:flex-row flex-col-reverse">
        <section className="md:w-1/2 px-8 w-full">
          <a ref={orderConfirmationRef} style={{ display: "none" }}>
            Redirecting...
          </a>
          <h3 className="text-xl text-left my-9">Contact information</h3>
          <form onSubmit={handleSubmit}>
            <div className="border-b pb-8 gap-4 flex md:flex-row flex-col">
              <InputField
                inputAutoComplete={"tel"}
                inputType="tel"
                inputName="Phone Number"
                inputValue={phoneNumber}
                valueReturner={setPhoneNumber}
                className="w-1/2"
              />
            </div>

            <div className="flex flex-col gap-4 border-b pb-8">
              <h3 className="text-xl text-left my-5 Shipping information">
                Shipping Information
              </h3>

              <div className="flex md:flex-row flex-col gap-4">
                <InputField
                  inputAutoComplete={"given-name"}
                  requiredInput={true}
                  inputValue={firstName}
                  valueReturner={setFirstName}
                  inputName="First Name"
                />
                <InputField
                  requiredInput={true}
                  inputAutoComplete={"family-name"}
                  inputValue={lastName}
                  valueReturner={setLastName}
                  inputName="Last Name"
                />
              </div>
              <InputField
                requiredInput={true}
                inputAutoComplete={"street-address"}
                inputValue={address}
                valueReturner={setAddress}
                inputName="Street Address"
              />

              <div className="flex gap-4 md:flex-row flex-col">
                <InputField
                  requiredInput={true}
                  inputAutoComplete={"address-level2"}
                  inputName="City"
                  inputValue={city}
                  valueReturner={setCity}
                />
                <InputField
                  inputAutoComplete={"address-level1"}
                  inputName="Province"
                  inputValue={state}
                  valueReturner={setState}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-4 border-b pb-8">
              <h3 className="text-xl text-left my-5 Shipping information">
                Payment Methods
              </h3>
              <div className="flex flex-wrap md:gap-4 justify-between gap-2">
                {paymentMethods.map((method, i) => {
                  return (
                    <div
                      className={`lg:w-[48%] w-full transition-all duration-300 rounded-xl text-left gap-4 select-none px-3 py-5 relative border-2 cursor-pointer flex items-center ${
                        method.identifier === paymentMethod &&
                        "border-brandOrange"
                      } justify-start`}
                      key={method.identifier}
                      onClick={() => {
                        setPaymentMethod(method.identifier);
                      }}
                    >
                      <img
                        src={method?.icon || "/placeholder.svg"}
                        className="h-8"
                        alt={method.name}
                      />
                      <div>
                        <h3>{method.name}</h3>
                        <div
                          className="text-sm text-gray-500"
                          dangerouslySetInnerHTML={{ __html: method.context }}
                        />
                      </div>

                      {paymentMethod === method.identifier && (
                        <div className="bg-brandOrange w-fit p-1 rounded-full absolute top-0 right-0 translate-x-2 -translate-y-2">
                          <IoCheckmarkSharp className="text-white" />
                        </div>
                      )}
                    </div>
                  );
                })}
                <Button
                  className="w-full bg-black py-3 rounded-xl text-white text-lg flex items-center justify-center gap-2 group my-3 !font-semibold"
                  loading={isSubmissionLoading}
                  type="submit"
                >
                  Confirm Order
                  <MdOutlineKeyboardArrowRight className="group-hover:translate-x-2 transition-all duration-200" />
                </Button>
              </div>
            </div>
          </form>
        </section>

        <section className="md:w-1/2 w-full px-8 md:!sticky top-4">
          <div className="flex w-full justify-between">
            <h3 className="text-xl text-left my-9">Order summary</h3>
            <h3
              className={`text-xl flex gap-4 items-center text-left my-9 ${
                productsLoading ? "skeleton-loading" : ""
              }`}
            >
              {products.length} Items{" "}
              <div
                className={`flex ${
                  isSummaryExpanded ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg
                  className="ml-2 my-auto"
                  width={16}
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </h3>
          </div>

          <div>
            <div className="products md:flex flex-wrap px-4 md:flex-row flex-col gap-y-4">
              {productsLoading ? (
                <div className="flex text-left gap-4 md:w-1/2 w-full">
                  <div>
                    <div className="w-[7rem] skeleton-loading aspect-square rounded" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="skeleton-loading">Best Perfumes</h3>
                    <h4 className="text-gray-600 skeleton-loading w-fit">
                      Rs. 1500
                    </h4>
                    <h5 className="text-gray-400 skeleton-loading w-fit">
                      x 2
                    </h5>
                  </div>
                </div>
              ) : (
                products.map((product, i) => (
                  <div
                    key={`product-${product.productId || i}`}
                    className="flex text-left gap-4 md:w-1/2 w-full"
                  >
                    <div>
                      <img
                        src={
                          product.product.primaryImgThumbnails[0].url ||
                          "/placeholder.svg"
                        }
                        className="w-[7rem] aspect-square rounded"
                        alt={product.product.title}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3>{product.product.title}</h3>
                      <h4 className="text-gray-600">
                        Rs. {product.selectedVariant.price}
                      </h4>
                      <h5 className="text-gray-400">x {product.quantity}</h5>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="py-8 flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-md leading-8 text-gray-800">
                    Sub Total
                  </p>
                  <p
                    className={`font-semibold text-md leading-8 text-red-800 ${
                      productsLoading ? "skeleton-loading" : ""
                    }`}
                  >
                    Rs. {subTotal}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-md leading-8 text-gray-800">
                    Shipping
                  </p>
                  <p
                    className={`font-semibold text-md leading-8 text-red-800 ${
                      productsLoading ? "skeleton-loading" : ""
                    }`}
                  >
                    {shippingFees === 0 ? "FREE" : `Rs. ${shippingFees}`}
                  </p>
                </div>
              </div>
              {discountValue > 0 && (
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-md leading-8 text-gray-800">
                      Coupon Discount
                    </p>
                    <p className="font-semibold text-md leading-8 text-red-800">
                      - Rs. {discountValue}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium text-xl leading-8 text-gray-800">
                  Total
                </p>
                <p
                  className={`font-semibold text-2xl leading-8 text-red-800 ${
                    productsLoading ? "skeleton-loading" : ""
                  }`}
                >
                  Rs. {total}
                </p>
              </div>
            </div>
            <div className="py-8 w-full">
              <PromoCodeForm
                productTags={allProductTags}
                discountValueReturner={getDiscountValue}
                discountTypeReturner={setDiscountType}
                coupon={coupon !== "none" && coupon}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}
