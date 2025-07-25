import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MainContent } from "./MainContent/MainContent";
import { Fallback } from "../../shared/ui/ErrorFallback/ErrorFallback.tsx";
// import { HeaderApp } from "./Header/Header.tsx";
import { DoubleButton } from "../../shared/ui/DoubleButton/DoubleButton.tsx";
import { useAppStore } from "../../shared/store/appStore.tsx";
import styles from "./Layout.module.scss";
import { ConsentMenuButton } from "../../shared/ui/CustomizeButton/CustomizeButton.tsx";
import { routesPath } from "../../shared/constants/constants.ts";

export const Layout = () => {
  const location = useLocation();
  const [errorKey, setErrorKey] = useState(location.pathname);
  const navigate = useNavigate();
  const isDocumentPage = location.pathname.includes("/document");
  const isPdnPage = location.pathname === "/";
  const isEdoPage = location.pathname === "/sign-edo";
  const isSignStatus = useAppStore((state) => state.isSignStatus);

  useEffect(() => {
    setErrorKey(location.pathname); // сброс при смене пути
  }, [location.pathname]);

  const handleOnClickSignature = () => {
    if (isDocumentPage) {
      return navigate({ to: routesPath.SIGNATURE_SERVICE });
    } else if (isPdnPage) {
      return navigate({ to: routesPath.SIGN_EDO });
    } else if (isEdoPage) {
      return navigate({ to: routesPath.DOCUMENT });
    }
  };

  const textBtnAgreements = isPdnPage
    ? "Согласен"
    : "Присоединяюсь к соглашению";

  return (
    <div className={styles.container} key={location.pathname}>
      {/*<HeaderApp />*/}
      <ErrorBoundary FallbackComponent={Fallback} resetKeys={[errorKey]}>
        <MainContent />
      </ErrorBoundary>
      {!isDocumentPage && (isPdnPage || isEdoPage) ? (
        <div className={styles.wrapper}>
          <ConsentMenuButton
            textButton={textBtnAgreements}
            handleOnClick={handleOnClickSignature}
            classNameBtn={styles.agreeBtn}
          />
        </div>
      ) : (
        isDocumentPage && (
          <DoubleButton
            textFirstButton="Подписать"
            textSecondButton="Скачать"
            handleOnClickFirst={handleOnClickSignature}
            linkApp={"https://mila.online/mila-downloadhtml"}
            isSignStatus={isSignStatus}
            classNameWrapper={styles.wrapperBtn}
          />
        )
      )}
    </div>
  );
};
