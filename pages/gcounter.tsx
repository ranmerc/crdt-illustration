import Styles from "@/styles/CounterPage.module.css";
import GCounterSystem from "@/components/System/GCounterSystem/GCounterSystem";
import { useState } from "react";
import mergeSystems from "@/utils/mergeSystems";
import GCounterStore from "@/stores/GCounterStore";
import Page from "@/components/Page/Page";

export default function GCounterPage() {
  const [counters, setCounters] = useState(() => {
    let counterArray = [];

    for (let i = 0; i < 3; i++) {
      counterArray.push(new GCounterStore());
    }

    return counterArray;
  });

  const SystemsList = (
    <ul className={Styles.counterList}>
      {counters.map((counter, i) => {
        return (
          <GCounterSystem name={`System ${i + 1}`} key={i} counter={counter} />
        );
      })}
    </ul>
  );

  const handleAddClick = () => {
    setCounters((counters) => {
      return [...counters, new GCounterStore()];
    });
  };

  const handleMergeClick = () => {
    mergeSystems(counters);
  };

  const About = (
    <>
      <p>
        A <strong>G-Counter</strong> CRDT represents a replicated counter which
        can be added to but not subtracted from. They can be used to implement
        the like button functionality of social media websites.
      </p>
      <ul>
        <li>
          The <em>internal state</em> of a G-Counter replicated on n machines is
          n-length array of non-negative integers.
        </li>

        <li>
          The <code>query</code> method returns the sum of every element in the
          n-length array.
        </li>

        <li>
          The <code>add(x)</code> update method, when invoked on the ith server,
          increments the ith entry of the n-length array by <code>x</code>. For
          example, server 0 will increment the 0th entry of the array, server 1
          will increment the 1st entry of the array, and so on.
        </li>

        <li>
          The <code>merge</code> method performs a pairwise maximum of the two
          arrays.
        </li>
      </ul>
    </>
  );

  const algorithm = `payload integer[n] P \n    initial [0,0,...,0]\nupdate increment()\n    let g = myId()\n    P[g] := P[g] + 1\nquery value() : integer v\n    let v = Σi P[i]\ncompare (X, Y) : boolean b\n    let b = (∀i ∈ [0, n - 1] : X.P[i] ≤ Y.P[i])\nmerge (X, Y) : payload Z\n    let ∀i ∈ [0, n - 1] : Z.P[i] = max(X.P[i], Y.P[i])`;

  return (
    <>
      <Page
        title="G-Counter"
        SystemsList={SystemsList}
        onAddClick={handleAddClick}
        onMergeClick={handleMergeClick}
        About={About}
        algorithm={algorithm}
      />
    </>
  );
}
