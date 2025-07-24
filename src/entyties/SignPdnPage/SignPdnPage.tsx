import styles from "./SignPdnPage.module.scss";
import { DocumentContent } from "../DocumentContent/DocumentContent.tsx";

export const SignPdnPage = () => {
  return (
    <div className={styles.container}>
      <DocumentContent title={"Согласие на обработку ПДН"} />
    </div>
  );
};
