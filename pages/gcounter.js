import Head from "next/head";
import Styles from "@/styles/GCounterPage.module.css";
import Counter from "@/components/Counter";
import { GCounter } from "crdts";
import { useState } from "react";

function mergeCounters(counters) {
  for (let i = 0; i < counters.length; i++) {
    for (let j = 0; j < counters.length; j++) {
      if (i !== j) {
        counters[i].merge(counters[j]);
      }
    }
  }
}

export default function GCounterPage() {
  const [counters, setCounters] = useState(() => {
    let counterArray = [];

    for (let i = 0; i < 3; i++) {
      counterArray.push(new GCounter("A"));
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
              <Counter
                name={`Counter ${i + 1}`}
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
              setCounters((counters) => [...counters, new GCounter("A")]);
            }}
          >
            Add Counter
          </button>
          <button
            onClick={() => {
              mergeCounters(counters);
              setMergeCount((c) => c + 1);
            }}
            className={Styles.mergeButton}
          >
            Merge Counters
          </button>
        </div>
      </main>
    </>
  );
}
