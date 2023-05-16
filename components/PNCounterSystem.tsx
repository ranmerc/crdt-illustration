import { useEffect, useState } from "react";
import Styles from "@/styles/Counter.module.css";
import PNCounter from "@/lib/PNCounter";

export default function PNCounterSystem({
  name,
  counter,
}: {
  name: string;
  counter: PNCounter;
}) {
  const [value, setValue] = useState(() => (counter ? counter.value : 0));
  const [pValue, setPValue] = useState(() => (counter ? counter.p.value : 0));
  const [nValue, setNValue] = useState(() => (counter ? counter.n.value : 0));

  // check on every counter if the value has changed
  useEffect(() => {
    if (counter) {
      if (value !== counter.value) {
        setValue(counter.value);
      }

      if (pValue !== counter.p.value) {
        setPValue(counter.p.value);
      }

      if (nValue !== counter.n.value) {
        setNValue(counter.n.value);
      }
    }
  });

  return (
    <>
      <div className={Styles.container}>
        <h3 className={Styles.title}>{name}</h3>
        <div className={Styles.pnInputContainer}>
          <div>
            <input
              type="number"
              disabled
              value={pValue}
              className={Styles.input}
            />

            <button
              type="button"
              onClick={() => {
                // syncing updates to state and counter
                // increment p counter
                counter.increment(1);
                setValue((value) => value + 1);
              }}
              className={Styles.button}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 13v3q0 .425.288.713T12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.713T16 11h-3V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v3H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13h3Zm1 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
                />
              </svg>
            </button>
          </div>

          <div>
            <input
              type="number"
              disabled
              value={nValue}
              className={Styles.input}
            />
            <button
              type="button"
              onClick={() => {
                // syncing updates to state and counter
                // increment n counter
                counter.decrement(1);
                setValue((value) => value - 1);
              }}
              className={Styles.button}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"
                />
              </svg>
            </button>
          </div>

          <input
            type="number"
            disabled
            value={value}
            className={Styles.input}
          />
        </div>
      </div>
    </>
  );
}
