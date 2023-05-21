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
        <section className={Styles.about}>
          <h3>About</h3>
          <div>
            <p>
              A <strong>G-Counter</strong> CRDT represents a replicated counter
              which can be added to but not subtracted from. They can be used to
              implement the like button functionality of social media websites.
            </p>
            <ul>
              <li>
                The <em>internal state</em> of a G-Counter replicated on n
                machines is n-length array of non-negative integers.
              </li>

              <li>
                The <code>query</code> method returns the sum of every element
                in the n-length array.
              </li>

              <li>
                The <code>add(x)</code> update method, when invoked on the ith
                server, increments the ith entry of the n-length array by{" "}
                <code>x</code>. For example, server 0 will increment the 0th
                entry of the array, server 1 will increment the 1st entry of the
                array, and so on.
              </li>

              <li>
                The <code>merge</code> method performs a pairwise maximum of the
                two arrays.
              </li>
            </ul>
          </div>
          <div>
            <h4>Algorithm</h4>
            <pre>
              <code>
                {`payload integer[n] P \n    initial [0,0,...,0]\nupdate increment()\n    let g = myId()\n    P[g] := P[g] + 1\nquery value() : integer v\n    let v = Σi P[i]\ncompare (X, Y) : boolean b\n    let b = (∀i ∈ [0, n - 1] : X.P[i] ≤ Y.P[i])\nmerge (X, Y) : payload Z\n    let ∀i ∈ [0, n - 1] : Z.P[i] = max(X.P[i], Y.P[i])`}
              </code>
            </pre>
          </div>
        </section>
      </main>
    </>
  );
}
