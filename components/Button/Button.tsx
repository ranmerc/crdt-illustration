import Styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className={Styles.button}>
      {children}
    </button>
  );
}
