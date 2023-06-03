import Styles from "./System.module.css";

export default function System({
  name,
  children,
}: {
  name: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <>
      <div className={`${Styles.container} ${Styles.newItem}`}>
        <h3 className={Styles.title}>{name}</h3>
        {children}
      </div>
    </>
  );
}
