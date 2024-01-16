"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import image1 from "./Assets/Image/image1.png";
import Head from "next/head";
import { useEffect, useState } from "react";
import logoPic from "../app/app/Assets/Images/logo.png";

import tempImage from "./Assets/Image/LandingPage0115.png";
import LocalStorage from "@/lib/localstroage";

import { motion } from "framer-motion";

export default function Home() {
  const imageAspectRatio = 2048 / 432;
  const [width, setWidth] = useState(0);
  const userId = LocalStorage.getItem("userId");
  const [isSignIn, setIsSignIn] = useState(false);

  const imageSrc = "https://clemory.io/IMAGES/landingPage/LandingPage0115.webp";

  useEffect(() => {
    if (userId) {
      setIsSignIn(true);
    }
    setWidth(window.innerWidth * 0.7);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth * 0.7);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth * 0.7);
      });
    };
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
      <div className="flex flex-col items-center justify-center mt-[57px] w-full bg-white py-40">
        <div className="flex flex-row items-center justify-center gap-20">
          <div className="flex flex-col items-center justify-center">
            <Image src={logoPic} width={300} height={300} alt="logo" />
          </div>
          <motion.div
            className="flex flex-col items-start justify-center"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            // animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-6xl font-bold leading-normal">Better storage.</p>
            <p className="text-6xl font-bold leading-tight">Better recall.</p>
            <p className="text-xl font-light">
              A second me that remembers knowledge better than me
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
