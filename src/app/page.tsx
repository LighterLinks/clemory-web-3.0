import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import image1 from "./Assets/Image/image1.png";
import Head from "next/head";

export default function Home() {
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
      <div className={styles.page1}>
        <h1 className={styles.text1}>
          Easy recall and retrieve all
          <br />
          knowledge you once had <p>using AI</p>
        </h1>
        <Link className={styles.button1} href="/app">
          Build your own memory cell now
        </Link>
        {/* <p className={styles.text2}>30 Days free trial | No credit card required</p> */}
        <Image className={styles.image1} src={image1} alt="image1" />
      </div>
    </>
  );
}
