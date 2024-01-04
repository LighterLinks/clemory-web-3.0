import { useCallback } from "react";
import styles from './styles.module.css';

export default function NodeDeleteCheckBtn({ onClick }: { onClick: () => void }) {
  return (
    <div className={styles.container}> 
      <button className={styles.textButton} onClick={onClick}>
        Delete
      </button>
    </div>
  );
}
