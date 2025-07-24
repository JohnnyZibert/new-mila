import styles from "./DocumentContent.module.scss";
import { PdfViewer } from "../../widgets/PDFviewer/PDFviewer.tsx";
import Title from "antd/lib/typography/Title";

interface Props {
  title?: string;
}

export const DocumentContent = ({ title }: Props) => {
  return (
    <div className={styles.container}>
      <Title className={styles.title} level={5}>
        {title}
      </Title>
      <PdfViewer />
    </div>
  );
};
