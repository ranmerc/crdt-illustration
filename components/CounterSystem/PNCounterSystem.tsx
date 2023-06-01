import { useSyncExternalStore } from "react";
import Styles from "@/styles/Counter.module.css";
import PNCounterStore from "@/stores/PNCounterStore";

export default function PNCounterSystem({
  name,
  counter,
}: {
  name: string;
  counter: PNCounterStore;
}) {
  const values = useSyncExternalStore(
    counter.subscribe,
    counter.getSnapshot,
    counter.getServerSnapshot
  );

  return (
    <>
      <div className={`${Styles.container} new-item`}>
        <h3 className={Styles.title}>{name}</h3>
        <div className={Styles.pnInputContainer}>
          <div>
            <input
              type="number"
              disabled
              value={values.p}
              className={Styles.input}
            />

            <button
              type="button"
              onClick={() => {
                counter.increment();
              }}
              className={Styles.button}
              title="increment p counter"
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
              value={values.n}
              className={Styles.input}
            />
            <button
              type="button"
              onClick={() => {
                counter.decrement();
              }}
              className={Styles.button}
              title="increment n counter"
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
            value={values.value}
            className={Styles.input}
          />
        </div>
      </div>
    </>
  );
}
