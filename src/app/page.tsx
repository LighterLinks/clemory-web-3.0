"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import image1 from "./Assets/Image/image1.png";
import Head from "next/head";
import { useEffect, useState } from "react";

import tempImage from "./Assets/Image/LandingPage0115.png";

export default function Home() {
  const imageAspectRatio = 2048 / 432;
  const [width, setWidth] = useState(0);

  const imageSrc = "https://clemory.io/IMAGES/landingPage/LandingPage0115.webp";

  useEffect(() => {
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
      <div className="flex w-full h-full align-middle justify-center">
        <Image
          src={tempImage}
          alt="Picture of the author"
          width={width}
          height={width * imageAspectRatio}
        />
      </div>
    </>
  );
}
