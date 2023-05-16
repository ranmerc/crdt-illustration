import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>CRDTs Illustration</title>
        <meta name="description" content="Illustrating CRDTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Link href={"/gcounter"}>G Counter</Link>
      </div>
      <div>
        <Link href={"/pncounter"}>PN Counter</Link>
      </div>
    </>
  );
}
