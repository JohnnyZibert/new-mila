import { useLocation } from "@tanstack/react-router";
import { Button, Layout, Popover } from "antd";
import cn from "classnames";
import { useEffect } from "react";

import styles from "./Header.module.scss";

const { Header } = Layout;

export const HeaderApp = () => {
  const path = useLocation();
  const isDevicePage = path.pathname.includes("device");

  const onClickLogout = () => {};

  useEffect(() => {}, []);

  return (
    <Header className={styles.header}>
      <div
        className={cn(
          styles.headerContent,
          { [styles.devicePage]: isDevicePage },
          { [styles.notDevicePage]: !isDevicePage },
        )}
      >
        <div>
          <Popover
            content={
              <Button className={styles.logout} onClick={onClickLogout}>
                Выход
              </Button>
            }
          ></Popover>
        </div>
      </div>
    </Header>
  );
};
