import cn from "classnames";
import styles from "./CustomizeButton.module.scss";
import { Button } from "antd";
import { useOrientation } from "../../hooks/Orientaion.tsx";

interface Props {
  handleOnClick?: () => void;
  textButton: string;
  isCancelBtn?: boolean;
  classNameBtn?: string;
  linkApp?: string;
}

export const ConsentMenuButton = ({
  handleOnClick,
  textButton,
  isCancelBtn = false,
  classNameBtn,
  linkApp,
}: Props) => {
  const isHorizontalOrientationDevice = useOrientation();

  return (
    <Button
      onClick={handleOnClick}
      className={cn(styles.button, classNameBtn, {
        [styles.cancelBtn]: isCancelBtn,
        [styles.horizontal]: isHorizontalOrientationDevice,
      })}
      type="default"
    >
      {linkApp ? (
        <a href={linkApp} target="_blank" rel="noreferrer">
          {textButton}
        </a>
      ) : (
        textButton
      )}
    </Button>
  );
};
