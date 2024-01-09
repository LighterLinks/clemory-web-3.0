import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import image1 from "./Assets/Image/image1.png";

export default function Home() {
  return (
    <div className={styles.page1}>
      <h1 className={styles.text1}>
        Easy recall and retrieve all<br/>knowledge you once had <p>using AI</p>
      </h1>
      <Link className={styles.button1} href="/app">Build your own memory cell now</Link>
      {/* <p className={styles.text2}>30 Days free trial | No credit card required</p> */}
      <Image className={styles.image1} src={image1} alt="image1" />
    </div>
  );
}
