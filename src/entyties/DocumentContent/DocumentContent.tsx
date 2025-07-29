import styles from "./DocumentContent.module.scss";
import Title from "antd/lib/typography/Title";
import type { ReactNode } from "react";
import { PdfViewer } from "../../widgets/PDFviewer/PdfViewer.tsx.tsx";

interface Props {
  title?: string | ReactNode;
}

export const DocumentContent = ({ title }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title className={styles.title} level={5}>
          {title}
        </Title>
      </div>
      <PdfViewer />
    </div>
  );
};
