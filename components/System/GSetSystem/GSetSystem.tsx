import { useState, useSyncExternalStore } from "react";
import Styles from "./GSetSystem.module.css";
import GSetStore from "@/stores/GSetStore";
import System from "../System";

export default function GSetSystem({
  name,
  set,
}: {
  name: string;
  set: GSetStore;
}) {
  const values = useSyncExternalStore(
    set.subscribe,
    set.getSnapshot,
    set.getServerSnapshot
  );
  const [input, setInput] = useState("");

  return (
    <>
      <System name={name}>
        <div className={Styles.inputContainer}>
          <div className={Styles.setContainer}>
            {values.size === 0 && (
              <div className={Styles.emptyContainer}>Empty</div>
            )}
            {Array.from(values).map((value, i) => (
              <div className={Styles.setValues} key={String(value)}>
                {value}
              </div>
            ))}
          </div>
          <form
            className={Styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              set.add(input);
              setInput("");
            }}
          >
            <input
              type="text"
              name="item"
              className={Styles.input}
              value={input}
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
      </System>
    </>
  );
}
