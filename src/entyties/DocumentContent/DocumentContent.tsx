import styles from "./DocumentContent.module.scss";
import { PdfViewer } from "../../widgets/PDFviewer/PDFviewer.tsx";
import Title from "antd/lib/typography/Title";
import { RotateRightOutlined } from "@ant-design/icons";

interface Props {
  title?: string;
}

export const DocumentContent = ({ title }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title className={styles.title} level={5}>
          {title}
        </Title>
        <RotateRightOutlined
          className={styles.rotateDevice}
          width={50}
          height={50}
        />
      </div>
      {/*<Title className={styles.title} level={5}>*/}
      {/*  {title}*/}
      {/*</Title>*/}
      <PdfViewer />
    </div>
  );
};
