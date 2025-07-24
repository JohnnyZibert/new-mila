import { Outlet } from "@tanstack/react-router";

import styles from "./MainContent.module.scss";

export const MainContent = () => {
  return (
    <main className={styles.mainContent}>
      <Outlet />
    </main>
  );
};
