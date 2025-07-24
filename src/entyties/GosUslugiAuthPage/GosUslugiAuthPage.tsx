import Title from "antd/lib/typography/Title";
import styles from "./GosUslugiAuthPage.module.scss";
import { DoubleButton } from "../../shared/ui/DoubleButton/DoubleButton.tsx";
import Paragraph from "antd/es/typography/Paragraph";
import LogoGosUslugi from "../../shared/assets/img/gosuslugi.svg?react";
import { useNavigate } from "@tanstack/react-router";
import { routesPath } from "../../shared/constants/constants.ts";

export const GosUslugiAuthPage = () => {
  const navigate = useNavigate();

  const handleOnClickSign = () => {
    console.log("авторизоваться в госуслуги");
  };

  const handleOnClickCancel = () => {
    navigate({ to: routesPath.DOCUMENT });
  };

  return (
    <div className={styles.container}>
      <Title level={3} className={styles.title}>
        Информированное <br /> добровольное согласие
      </Title>
      <Paragraph>
        Комплект документов содержит информированное добровольное согласие{" "}
        <strong>(ИДС)</strong>, которое в силу закона, возможно подписать в
        электронном виде только с использованием авторизации через портал
        <strong>«Госуслуги» (ЕСИА)</strong>.
      </Paragraph>
      <Paragraph>
        Просим Вас пройти авторизацию для подписания комплекта документов.
      </Paragraph>
      <div className={styles.logoWrapper}>
        <LogoGosUslugi className={styles.logoGos} />
      </div>
      <DoubleButton
        textFirstButton="Авторизоваться"
        textSecondButton="Отмена"
        handleOnClickFirst={handleOnClickSign}
        handleOnClickSecond={handleOnClickCancel}
        classNameWrapper={styles.wrapperBtn}
        classNameFirstBtn={styles.authButton}
      />
    </div>
  );
};
