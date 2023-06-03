import GSetSystem from "@/components/System/GSetSystem/GSetSystem";
import Page from "@/components/Page/Page";
import GSetStore from "@/stores/GSetStore";
import mergeSystems from "@/utils/mergeSystems";
import { useState } from "react";
import Styles from "@/styles/SetPage.module.css";

export default function GSetPage() {
  const [sets, setSets] = useState(() => {
    let setArray = [];

    for (let i = 0; i < 3; i++) {
      setArray.push(new GSetStore());
    }

    return setArray;
  });

  const handleAddClick = () => {
    setSets((sets) => {
      return [...sets, new GSetStore()];
    });
  };

  const handleMergeClick = () => {
    mergeSystems(sets);
  };

  const SystemsList = (
    <ul className={Styles.counterList}>
      {sets.map((set, i) => {
        return <GSetSystem name={`System ${i + 1}`} key={i} set={set} />;
      })}
    </ul>
  );

  const About = (
    <>
      <p>
        A <strong>G-Set</strong> CRDT represents a replicated set which can be
        added to but not removed from.
      </p>
      <ul>
        <li>
          The <em>internal state</em> of a G-Set is just a set!
        </li>
        <li>
          The <code>query</code> method returns the set.
        </li>
        <li>
          The <code>add(x)</code> update method adds <code>x</code> to the set.
        </li>
        <li>
          The <code>merge</code> method performs a set union.
        </li>
      </ul>
    </>
  );

  const algorithm = `payload set A\n   initial ∅\nupdate add(element e)\n    A := A ∪ {e}\nquery lookup(element e) : boolean b\n    let b = (e ∈ A)\ncompare (S, T) : boolean b\n    let b = (S.A ⊆ T.A)\nmerge (S, T) : payload U\n    let U.A = S.A ∪ T.A`;

  return (
    <>
      <Page
        title="Grow-only Set"
        SystemsList={SystemsList}
        About={About}
        algorithm={algorithm}
        onAddClick={handleAddClick}
        onMergeClick={handleMergeClick}
      ></Page>
    </>
  );
}
