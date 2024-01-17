"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import image1_1 from "./Assets/Image/Image1_1.png";
import image1_2 from "./Assets/Image/Image1_2.png";
import image1_3 from "./Assets/Image/Image1_3.png";
import image1_4 from "./Assets/Image/Image1_4.png";
import image1_5 from "./Assets/Image/Image1_5.png";
import image2_1 from "./Assets/Image/Image2_1.png";
import image3_1 from "./Assets/Image/Image3_1.png";
import image4_1 from "./Assets/Image/Image4_1.png";
import image4_2 from "./Assets/Image/Image4_2.png";
import image5_1 from "./Assets/Image/Image5_1.png";
import logo1 from "./Assets/Image/logo1.png";
import logo2 from "./Assets/Image/logo2.png";

import Head from "next/head";
import { useEffect, useState } from "react";
import logoPic from "../app/app/Assets/Images/logo.png";

import LocalStorage from "@/lib/localstroage";

import { motion } from "framer-motion";

export default function Home() {
  const userId = LocalStorage.getItem("userId");
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsSignIn(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Clemory</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Clemory App made my Lighter Links." />
        <meta property="og:title" content="Clemory" />
        <meta property="og:image" content="%PUBLIC_URL%/logo840.png" />
        <meta property="og:url" content="https://clemory.io" />
        <meta
          property="og:description"
          content="Clemory - Personal Information Storage"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      </Head>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row w-full bg-white p-2 fixed top-0 left-0 align-middle items-center justify-between border-b-[1px]">
          <div className="flex flex-row items-center gap-2 text-black text-lg">
            <Image src={logoPic} width={40} height={40} alt="logo" />
            <p>Clemory</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            {isSignIn ? (
              <Link href="/app">
                <p className="text-white bg-[#D55F5A] ml-4 p-2 px-3 rounded-lg hover:opacity-85">
                  Go to App
                </p>
              </Link>
            ) : (
              <>
                <Link href="/signin">
                  <p className="text-[#D55F5A] hover:underline">Sign in</p>
                </Link>
                <Link href="/signup">
                  <p className="text-white bg-[#D55F5A] ml-4 p-2 px-3 rounded-lg hover:opacity-85">
                    Get Started Now!
                  </p>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-[57px] w-full py-40 max-w-6xl gap-y-96">
          <div className="flex flex-col items-center justify-center gap-10 sm:flex-row px-10">
            <div className="flex flex-col items-center justify-center">
              <Image src={logoPic} width={300} height={300} alt="logo" />
            </div>
            <motion.div
              className="flex flex-col items-start justify-center"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              // animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-6xl font-bold leading-normal">
                Better storage.
              </p>
              <p className="text-6xl font-bold leading-tight">Better recall.</p>
              <p className="text-xl font-light">
                A second me that remembers knowledge better than me
              </p>
            </motion.div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex flex-row items-start justify-start w-full px-16 mb-10 gap-5">
              <Image src={logo1} width={50} alt="logo1" />
              <p className="text-4xl font-medium leading-normal">Storage</p>
            </div>
            <motion.div
              className="flex flex-col items-start justify-center px-20 gap-y-2 mb-36"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              // animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-lg font-normal leading-normal">
                <span style={{ color: "#3B7DF9" }}>Drag and drop icons</span> to
                create and save new knowledges
              </p>
              <Image src={image1_1} alt="image1_1" />
            </motion.div>
            <motion.div
              className="flex flex-col items-start justify-center px-20 gap-y-2 mb-36"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              // animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-lg font-normal leading-normal">
                Expand notes and websites using{" "}
                <span style={{ color: "#3B7DF9" }}>
                  markdown editors with tabs
                </span>
              </p>
              <Image src={image2_1} alt="image1_1" />
            </motion.div>
            <motion.div
              className="flex flex-col items-start justify-center px-20 gap-y-2 mb-36"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              // animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-lg font-normal leading-normal">
                <span style={{ color: "#3B7DF9" }}>Organize</span> your
                knowledges on a canvas
              </p>
              <Image src={image3_1} alt="image1_1" />
            </motion.div>
            <div className="flex flex-row items-start justify-start w-full px-16 mb-10 gap-5">
              <Image src={logo2} width={50} alt="logo1" />
              <p className="text-4xl font-medium leading-normal">Retrieval</p>
            </div>
            <motion.div
              className="flex flex-col items-start justify-center px-20 gap-y-2 mb-36"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              // animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-lg font-normal leading-normal">
                <span style={{ color: "#FFB865" }}>Question your chatbot</span>{" "}
                to gain knowledge you saved in the past
              </p>
              <p className="text-lg font-normal leading-normal">
                <span style={{ color: "#FFB865" }}>Click on the icon</span> to
                find the knowledge on your canvas
              </p>
              <Image src={image4_1} alt="image1_1" />
            </motion.div>
            <motion.div
              className="flex flex-col items-start justify-center px-20 gap-y-2 mb-36"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              // animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="text-lg font-normal leading-normal">
                <span style={{ color: "#FFB865" }}>
                  Share your knowledge canvas
                </span>{" "}
                and see others’ too
              </p>
              <Image src={image5_1} alt="image1_1" />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
