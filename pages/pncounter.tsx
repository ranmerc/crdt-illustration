import Styles from "@/styles/CounterPage.module.css";
import PNCounterSystem from "@/components/System/PNCounterSystem/PNCounterSystem";
import { useState } from "react";
import mergeSystems from "@/utils/mergeSystems";
import PNCounterStore from "@/stores/PNCounterStore";
import Page from "@/components/Page/Page";

export default function PNCounterPage() {
  const [counters, setCounters] = useState(() => {
    let counterArray = [];

    for (let i = 0; i < 3; i++) {
      counterArray.push(new PNCounterStore());
    }

    return counterArray;
  });

  const SystemsList = (
    <ul className={Styles.counterList}>
      {counters.map((counter, i) => {
        return (
          <PNCounterSystem name={`System ${i + 1}`} key={i} counter={counter} />
        );
      })}
    </ul>
  );

  const handleAddClick = () => {
    setCounters((counters) => {
      return [...counters, new PNCounterStore()];
    });
  };

  const handleMergeClick = () => {
    mergeSystems(counters);
  };

  const About = (
    <>
      <p>
        A <strong>PN-Counter</strong> CRDT represents a replicated counter which
        can be added to <em>and</em> subtracted from. These can serve as a
        general purpose counters, as they also provide a decrement operation.
        Example can be a upvotes and downvotes on social media posts.
      </p>
      <ul>
        <li>
          The <em>internal state</em> of a PN-Counter is a pair of two
          G-Counters named <code>p</code> and <code>n</code>. <code>p</code>{" "}
          represents the total value added to the PN-Counter while{" "}
          <code>n</code> represents the total value subtracted from the
          PN-Counter.
        </li>

        <li>
          The <code>query</code> method returns the difference{" "}
          <code>p.query() - n.query()</code>.
        </li>

        <li>
          The <code>add(x)</code> method (the first of the two update methods)
          invokes <code>p.add(x)</code>.
        </li>

        <li>
          The <code>sub(x)</code> method (the second of the two update methods)
          invokes <code>n.add(x)</code>.
        </li>

        <li>
          The <code>merge</code> method performs a pairwise merge of
          <code>p</code> and <code>n</code>.
        </li>
      </ul>
    </>
  );

  const algorithm = `payload integer[n] P, integer[n] N\n    initial [0,0,...,0], [0,0,...,0]\nupdate increment()\n    let g = myId()\n    P[g] := P[g] + 1\nupdate decrement()\n    let g = myId()\n    N[g] := N[g] + 1\nquery value() : integer v\n    let v = Σi P[i] - Σi N[i]\ncompare (X, Y) : boolean b\n    let b = (∀i ∈ [0, n - 1] : X.P[i] ≤ Y.P[i] ∧ ∀i ∈ [0, n - 1] : X.N[i] ≤ Y.N[i])\nmerge (X, Y) : payload Z\n    let ∀i ∈ [0, n - 1] : Z.P[i] = max(X.P[i], Y.P[i])\n    let ∀i ∈ [0, n - 1] : Z.N[i] = max(X.N[i], Y.N[i])`;

  return (
    <>
      <Page
        title="Positive-Negative Counter"
        SystemsList={SystemsList}
        onAddClick={handleAddClick}
        onMergeClick={handleMergeClick}
        About={About}
        algorithm={algorithm}
      />
    </>
  );
}
