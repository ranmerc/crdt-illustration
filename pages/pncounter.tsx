import Head from "next/head";
import Styles from "@/styles/CounterPage.module.css";
import PNCounterSystem from "@/components/PNCounterSystem";
import PNCounter from "@/lib/PNCounter";
import { useState } from "react";
import mergeCounters from "@/utils/mergeCounters";
import PageTitle from "@/components/PageTitle/PageTitle";
import CounterButtonsBar from "@/components/CounterButtonsBar/CounterButtonsBar";

export default function PNCounterPage() {
  const [counters, setCounters] = useState(() => {
    let counterArray = [];

    for (let i = 0; i < 3; i++) {
      counterArray.push(new PNCounter());
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
        <title>PN-Counter</title>
        <meta name="description" content="PN-Counter CRDT illustration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={Styles.container}>
        <PageTitle>Positive-Negative Counter</PageTitle>
        <ul className={Styles.counterList}>
          {counters.map((counter, i) => {
            return (
              <PNCounterSystem
                name={`System ${i + 1}`}
                key={i}
                counter={counters[i]}
              />
            );
          })}
        </ul>
        <CounterButtonsBar
          onAddClick={() => {
            setCounters((counters) => [...counters, new PNCounter()]);
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
