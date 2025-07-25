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
  const [errorKey] = useState(location.pathname);
  const navigate = useNavigate();
  const isDocumentPage = location.pathname.includes(routesPath.DOCUMENT);
  const isPdnPage = location.pathname === routesPath.SIGN_PDN;
  const isEdoPage = location.pathname === routesPath.SIGN_EDO;
  const isSignStatus = useAppStore((state) => state.isSignStatus);
  const [textBtn, setTextBtn] = useState<string>("");

  const handleOnClickDownloadPdf = () => {
    console.log("Скачать ПДФ");
  };

  const handleOnClickSignature = () => {
    if (isDocumentPage) {
      return navigate({ to: routesPath.SIGNATURE_SERVICE });
    } else if (isPdnPage) {
      return navigate({ to: routesPath.SIGN_EDO });
    } else if (isEdoPage) {
      return navigate({ to: routesPath.DOCUMENT });
    }
  };

  useEffect(() => {
    if (isDocumentPage) {
      setTextBtn("Подписать");
    } else if (isPdnPage) {
      setTextBtn("Согласен");
    } else if (isEdoPage) {
      setTextBtn("Присоединяюсь к соглашению");
    }
  }, [location.pathname]);

  return (
    <div className={styles.container} key={location.pathname}>
      {/*<HeaderApp />*/}
      <ErrorBoundary FallbackComponent={Fallback} resetKeys={[errorKey]}>
        <MainContent />
      </ErrorBoundary>
      {!isDocumentPage && (isPdnPage || isEdoPage) ? (
        <div className={styles.wrapper}>
          <ConsentMenuButton
            textButton={textBtn}
            handleOnClick={handleOnClickSignature}
            classNameBtn={styles.agreeBtn}
          />
        </div>
      ) : (
        isDocumentPage && (
          <DoubleButton
            textFirstButton={textBtn}
            textSecondButton="Скачать"
            handleOnClickFirst={handleOnClickSignature}
            handleOnClickSecond={handleOnClickDownloadPdf}
            isSignStatus={isSignStatus}
            classNameWrapper={styles.wrapperBtn}
          />
        )
      )}
    </div>
  );
};
