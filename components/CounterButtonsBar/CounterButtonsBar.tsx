import Styles from "./CounterButtonsBar.module.css";
import Button from "../Button/Button";

export default function CounterButtonsBar({
  onAddClick,
  onMergeClick,
}: {
  onAddClick: () => void;
  onMergeClick: () => void;
}) {
  return (
    <div className={Styles.container}>
      <Button onClick={onAddClick}>Add System</Button>
      <Button onClick={onMergeClick}>Merge Systems</Button>
    </div>
  );
}
