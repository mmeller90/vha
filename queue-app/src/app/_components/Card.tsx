interface Props {
  name: string;
  value: number;
  clicked: () => void;
}

import styles from "./Card.module.css"

const Card = (props: Props) => {
  return (<div className={styles.card}>
    <div className={styles.content}>
      <div>{props.name}</div>
      <div>{props.value}</div>
    </div>
    <div className={styles.button} onClick={() => {
      props.clicked();
    }}>GO</div>
  </div>);
}

export default Card;