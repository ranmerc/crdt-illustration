import { useState, useSyncExternalStore } from "react";
import Styles from "./TwoPSetSystem.module.css";
import System from "../System";
import TwoPSetStore from "@/stores/2PSetStore";

export default function TwoPSetSystem({
  name,
  set,
}: {
  name: string;
  set: TwoPSetStore;
}) {
  const values = useSyncExternalStore(
    set.subscribe,
    set.getSnapshot,
    set.getServerSnapshot
  );
  const [addedInput, setInput] = useState("");
  const [removedInput, setRemovedInput] = useState("");

  return (
    <>
      <div className={Styles.systemContainer}>
        <System name={name}>
          <div className={Styles.container}>
            {/* Added container */}
            <div className={Styles.inputContainer}>
              <div className={Styles.setContainer}>
                <h5>Added Set</h5>
                {values.added.size === 0 && (
                  <div className={Styles.emptyContainer}>Empty</div>
                )}
                {Array.from(values.added.values()).map((value, i) => (
                  <div className={Styles.setValues} key={String(value)}>
                    {value}
                  </div>
                ))}
              </div>
              <form
                className={Styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  set.add(addedInput);
                  setInput("");
                }}
              >
                <input
                  type="text"
                  name="item"
                  className={Styles.input}
                  value={addedInput}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  aria-label="Add Item"
                  required
                />
                <button className={Styles.button} type="submit">
                  Add Item
                </button>
              </form>
            </div>

            {/* Removed container */}
            <div className={Styles.inputContainer}>
              <div className={Styles.setContainer}>
                <h5>Removed Set</h5>
                {values.removed.size === 0 && (
                  <div className={Styles.emptyContainer}>Empty</div>
                )}
                {Array.from(values.removed.values()).map((value, i) => (
                  <div className={Styles.setValues} key={String(value)}>
                    {value}
                  </div>
                ))}
              </div>
              <form
                className={Styles.form}
                onSubmit={(e) => {
                  e.preventDefault();
                  set.remove(removedInput);
                  setRemovedInput("");
                }}
              >
                <input
                  type="text"
                  name="item"
                  className={Styles.input}
                  value={removedInput}
                  onChange={(e) => {
                    setRemovedInput(e.target.value);
                  }}
                  aria-label="Remove Item"
                  required
                />
                <button className={Styles.button} type="submit">
                  Remove Item
                </button>
              </form>
            </div>

            {/* Values container */}
            <div className={Styles.inputContainer}>
              <div className={Styles.setContainer}>
                <h5>Values</h5>
                {values.values.size === 0 && (
                  <div className={Styles.emptyContainer}>Empty</div>
                )}
                {Array.from(values.values.values()).map((value, i) => (
                  <div className={Styles.setValues} key={String(value)}>
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </System>
      </div>
    </>
  );
}
