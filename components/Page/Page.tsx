import Head from "next/head";
import PageTitle from "../PageTitle/PageTitle";
import Styles from "./Page.module.css";
import CounterButtonsBar from "../CounterButtonsBar/CounterButtonsBar";

export default function Page<T>({
  title,
  SystemsList,
  About,
  algorithm,
  children,
  onAddClick,
  onMergeClick,
}: {
  title: string;
  SystemsList: JSX.Element | JSX.Element[];
  About: JSX.Element | JSX.Element[];
  algorithm: string;
  children?: JSX.Element | JSX.Element[];
  onAddClick: () => void;
  onMergeClick: () => void;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`${title} CRDT illustration`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={Styles.container}>
        <PageTitle>{title}</PageTitle>

        {SystemsList}

        <CounterButtonsBar
          onAddClick={onAddClick}
          onMergeClick={onMergeClick}
        ></CounterButtonsBar>

        <section className={Styles.about}>
          <h3>About</h3>
          <div>{About}</div>
          <div>
            <h4>Algorithm</h4>
            <pre>
              <code>{algorithm}</code>
            </pre>
          </div>
        </section>

        {children}
      </main>
    </>
  );
}
