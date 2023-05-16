import Head from "next/head";
import Styles from "@/styles/CounterPage.module.css";
import GCounterSystem from "@/components/GCounterSystem";
import GCounter from "@/lib/GCounter";
import { useState } from "react";
import mergeCounters from "@/utils/mergeCounters";

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
        <h1 className={Styles.title}>Grow Only Counter</h1>
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
        <div className={Styles.buttonContainer}>
          <button
            className={Styles.addButton}
            onClick={() => {
              setCounters((counters) => [...counters, new GCounter(0)]);
            }}
          >
            Add System
          </button>
          <button
            onClick={() => {
              mergeCounters(counters);
              setMergeCount((c) => c + 1);
            }}
            className={Styles.mergeButton}
          >
            Merge Systems
          </button>
        </div>
      </main>
    </>
  );
}
