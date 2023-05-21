import Styles from "./PageTitle.module.css";

export default function PageTitle({ children }: { children: string }) {
  return <h1 className={Styles.title}>{children}</h1>;
}
