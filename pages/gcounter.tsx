import Head from "next/head";
import Styles from "@/styles/CounterPage.module.css";
import GCounterSystem from "@/components/GCounterSystem";
import GCounter from "@/lib/GCounter";
import { useState } from "react";
import mergeCounters from "@/utils/mergeCounters";
import PageTitle from "@/components/PageTitle/PageTitle";
import CounterButtonsBar from "@/components/CounterButtonsBar/CounterButtonsBar";

export default function GCounterPage() {
  const [counters, setCounters] = useState(() => {
    let counterArray = [];

    for (let i = 0; i < 3; i++) {
      counterArray.push(new GCounter(0));
    }

    return counterArray;
  });

  // to cause rerender of children,
  // rerender forces children to update their state
  // value based on current counter value
  const [mergeCount, setMergeCount] = useState(0);

  return (
    <>
      <Head>
        <title>G-Counter</title>
        <meta name="description" content="G-Counter CRDT illustration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={Styles.container}>
        <PageTitle>Grow-only Counter</PageTitle>
        <ul className={Styles.counterList}>
          {counters.map((counter, i) => {
            return (
              <GCounterSystem
                name={`System ${i + 1}`}
                key={i}
                counter={counters[i]}
              />
            );
          })}
        </ul>
        <CounterButtonsBar
          onAddClick={() => {
            setCounters((counters) => [...counters, new GCounter(0)]);
          }}
          onMergeClick={() => {
            mergeCounters(counters);
            setMergeCount((c) => c + 1);
          }}
        ></CounterButtonsBar>
      </main>
    </>
  );
}
