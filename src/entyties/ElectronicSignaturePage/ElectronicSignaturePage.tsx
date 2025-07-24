import Title from "antd/lib/typography/Title";
import styles from "./ElectronicSignaturePage.module.scss";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { DoubleButton } from "../../shared/ui/DoubleButton/DoubleButton.tsx";
import { useScrollToTop } from "../../shared/hooks/ScrollToTop.ts";
import { useAppStore } from "../../shared/store/appStore.tsx";
import { routesPath } from "../../shared/constants/constants.ts";

export const ElectronicSignaturePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setIsSignStatus = useAppStore().setIsSignStatus;

  useScrollToTop();

  const handleOnClickSign = () => {
    setIsSignStatus(true);
    navigate({ to: routesPath.DOCUMENT });
  };

  const handleOnClickCancel = () => {
    navigate({ to: routesPath.DOCUMENT });
  };

  return (
    <div className={styles.container} key={location.pathname}>
      <Title level={3} className={styles.title}>
        N3.Health <br /> Сервис электронной подписи
      </Title>
      <p className={styles.info}>
        Нажимая кнопку <strong>«Подписать»</strong> вы присоединяетесь к
        Соглашению об использовании Сервиса подписания клинических исследований
        Mila.Online, полные Условия и Правила <br /> использования размещены по
        адресу:
        <br />
        <a
          className={styles.link}
          href="https://mila.online/legal"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://mila.online/legal
        </a>{" "}
        и были приняты при регистрации в приложении.
      </p>

      <Title level={5} className={styles.code}>
        Код подписи
      </Title>
      <p className={styles.info}>
        Для подписания документа — введите ключ (код), направленный Вам на адрес
        электронной почты, смс или мессенджер:
      </p>

      <div className={styles.inputWrapper}>
        <input type="text" value="WbKui07w" readOnly />
      </div>

      <DoubleButton
        textFirstButton="Подписать"
        textSecondButton="Отказаться от подписи"
        handleOnClickFirst={handleOnClickSign}
        handleOnClickSecond={handleOnClickCancel}
        classNameWrapper={styles.wrapperBtn}
      />
    </div>
  );
};
