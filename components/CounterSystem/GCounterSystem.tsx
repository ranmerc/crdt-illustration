import { useSyncExternalStore } from "react";
import Styles from "@/styles/Counter.module.css";
import GCounterStore from "@/stores/GCounterStore";

export default function GCounterSystem({
  name,
  counter,
}: {
  name: string;
  counter: GCounterStore;
}) {
  const value = useSyncExternalStore(
    counter.subscribe,
    counter.getSnapshot,
    counter.getServerSnapshot
  );

  return (
    <>
      <div className={`${Styles.container} new-item`}>
        <h3 className={Styles.title}>{name}</h3>
        <div className={Styles.inputContainer}>
          <input
            type="number"
            disabled
            value={value}
            className={Styles.input}
          />
          <button
            type="button"
            onClick={() => {
              counter.increment();
            }}
            className={Styles.button}
            title="increment counter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="25px"
              height="25px"
            >
              <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
