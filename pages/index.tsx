import Head from "next/head";
import Styles from "@/styles/Home.module.css";
import PageTitle from "@/components/PageTitle/PageTitle";
import TypeCard from "@/components/TypeCard/TypeCard";

export default function Home() {
  return (
    <>
      <Head>
        <title>CRDTs Illustration</title>
        <meta name="description" content="Illustrating CRDTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={Styles.container}>
        <PageTitle>Conflict-free Replicated Datatypes</PageTitle>
        <div className={Styles.cardContainer}>
          <TypeCard
            href="/gcounter"
            src="/gcounter.png"
            name="Grow-only Counter"
            description="A counter which can only be incremented."
          />
          <TypeCard
            href="/pncounter"
            src="/pncounter.png"
            name="Positive-Negative Counter"
            description="A counter which can be both incremented and decremented. Built using two GCounters."
          />
          <TypeCard
            href="/gset"
            src="/gset.png"
            name="Grow-only Set"
            description="A set which can only be added to."
          />
          <TypeCard
            href="/twopset"
            src="/twopset.png"
            name="Two-Phase Set"
            description="A set which can be both added to and removed from. Built using two GSets."
          />
        </div>
      </main>
    </>
  );
}
