import cn from "classnames";
import styles from "./DoubleButton.module.scss";
import { useOrientation } from "../../hooks/Orientaion.tsx";
import { ConsentMenuButton } from "../CustomizeButton/CustomizeButton.tsx";
import { useEffect } from "react";

interface Props {
  textFirstButton: string;
  textSecondButton: string;
  handleOnClickFirst?: () => void;
  handleOnClickSecond?: () => void;
  classNameWrapper?: string;
  classNameFirstBtn?: string;
  classNameSecondBtn?: string;
  isSignStatus?: boolean;
  linkApp?: string;
}

export const DoubleButton = ({
  textFirstButton,
  textSecondButton,
  handleOnClickFirst,
  handleOnClickSecond,
  classNameWrapper,
  classNameFirstBtn,
  classNameSecondBtn,
  isSignStatus,
  linkApp,
}: Props) => {
  const isHorizontalOrientationDevice = useOrientation();

  useEffect(() => {
    //убирает активность с кнопки на мобилке
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 30);
  }, []);

  return (
    <div
      className={cn(styles.buttons, classNameWrapper, {
        [styles.horizontal]: isHorizontalOrientationDevice,
      })}
    >
      {!isSignStatus && (
        <ConsentMenuButton
          textButton={textFirstButton}
          handleOnClick={handleOnClickFirst}
          classNameBtn={classNameFirstBtn}
        />
      )}
      <ConsentMenuButton
        textButton={textSecondButton}
        handleOnClick={handleOnClickSecond}
        classNameBtn={classNameSecondBtn}
        isCancelBtn
        linkApp={linkApp}
      />
    </div>
  );
};
