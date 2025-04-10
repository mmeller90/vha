interface Props {
  name: string;
  value: number;
}

import styles from "./Card.module.css"

const Card = (props: Props) => {
  return (<div className={styles.card}>
    <div>{props.name}</div>
    <div>{props.value}</div>
  </div>);
}

export default Card;