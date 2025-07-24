import { useEffect, useState } from "react";

export const useOrientation = () => {
  const getOrientation = () =>
    window.matchMedia("(orientation: portrait)").matches
      ? "vertical"
      : "horizontal";

  const [orientation, setOrientation] = useState(getOrientation());

  useEffect(() => {
    const handler = () => setOrientation(getOrientation());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return orientation === "horizontal";
};
