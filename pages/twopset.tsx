import Page from "@/components/Page/Page";
import mergeSystems from "@/utils/mergeSystems";
import { useState } from "react";
import Styles from "@/styles/SetPage.module.css";
import TwoPSetStore from "@/stores/2PSetStore";
import TwoPSetSystem from "@/components/System/TwoPSetSystem/TwoPSetSystem";

export default function TwoPSet() {
  const [sets, setSets] = useState(() => {
    let setArray = [];

    for (let i = 0; i < 3; i++) {
      setArray.push(new TwoPSetStore());
    }

    return setArray;
  });

  const handleAddClick = () => {
    setSets((sets) => {
      return [...sets, new TwoPSetStore()];
    });
  };

  const handleMergeClick = () => {
    mergeSystems(sets);
  };

  const SystemsList = (
    <ul className={Styles.counterList}>
      {sets.map((set, i) => {
        return <TwoPSetSystem name={`System ${i + 1}`} key={i} set={set} />;
      })}
    </ul>
  );

  const About = (
    <>
      <p>
        A <strong>2P-Set</strong> CRDT represents a replicated set which can be
        added to <em>and</em> removed from.
      </p>
      <ul>
        <li>
          The <em>internal state</em> of a 2P-Set is a pair of two G-Sets named
          <code>a</code> and <code>r</code>. <code>a</code> represents the set
          of values added to the 2P-Set while <code>r</code> represents the set
          of values removed from the 2P-Set.
        </li>

        <li>
          The <code>query</code> method returns the set difference
          <code>a.query() - r.query()</code>.
        </li>

        <li>
          The <code>add(x)</code> method (the first of the two update methods)
          invokes <code>a.add(x)</code>.
        </li>

        <li>
          The <code>sub(x)</code> method (the second of the two update methods)
          invokes <code>r.add(x)</code>.
        </li>

        <li>
          The <code>merge</code> method performs a pairwise merge of
          <code>a</code> and <code>r</code>.
        </li>
      </ul>
    </>
  );

  const algorithm = `payload set A, set R\n    initial ∅, ∅\nquery lookup(element e) : boolean b\n    let b = (e ∈ A ∧ e ∉ R)\nupdate add(element e)\n  A := A ∪ {e}\nupdate remove(element e)\n    pre lookup(e)\n    R := R ∪ {e}\ncompare (S, T) : boolean b\n    let b = (S.A ⊆ T.A ∧ S.R ⊆ T.R)\nmerge (S, T) : payload U\n    let U.A = S.A ∪ T.A\n    let U.R = S.R ∪ T.R`;

  return (
    <>
      <Page
        title="Two-Phase Set"
        SystemsList={SystemsList}
        About={About}
        algorithm={algorithm}
        onAddClick={handleAddClick}
        onMergeClick={handleMergeClick}
      ></Page>
    </>
  );
}
