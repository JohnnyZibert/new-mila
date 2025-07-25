import { DocumentContent } from "../DocumentContent/DocumentContent.tsx";
import { useScrollToTop } from "../../shared/hooks/ScrollToTop.ts";
import { useAppStore } from "../../shared/store/appStore.tsx";
import { useEffect, useState } from "react";
import { Modal, Typography } from "antd";
import styles from "./DocumentPage.module.scss";
import LogoMila from "../../shared/assets/img/logoMila.svg?react";
import { DoubleButton } from "../../shared/ui/DoubleButton/DoubleButton.tsx";
import { downloadMilaApp } from "../../shared/constants/constants.ts";

const { Paragraph, Title } = Typography;

export const DocumentPage = () => {
  const isSignStatus = useAppStore((state) => state.isSignStatus);
  // const setIsSignStatus = useAppStore().setIsSignStatus;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isSignStatus) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 1000);
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useScrollToTop();

  return (
    <div className={styles.container}>
      <DocumentContent title={"Просмотр документа"} />
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        className={styles.modal}
        closable={false}
        centered
        footer={
          <DoubleButton
            textFirstButton={"Установить"}
            textSecondButton={"Отмена"}
            linkApp={downloadMilaApp}
            handleOnClickSecond={closeModal}
            classNameWrapper={styles.buttons}
          />
        }
      >
        <Title className={styles.title} level={4}>
          Приложение Mila.Online
        </Title>
        <LogoMila className={styles.logo} />
        <Paragraph className={styles.info}>
          Вся медкарта и документы в одном приложении. Установите приложение
          MILA.Online и документация из частных медицинских организаций, в
          которые Вы обращались будет у Вас под рукой.
        </Paragraph>
      </Modal>
    </div>
  );
};
