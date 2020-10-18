import { useLayoutEffect } from "react";

export default function useResize(resizeFunction) {
  useLayoutEffect(() => {
    resizeFunction();

    window.addEventListener("resize", resizeFunction);
    return () => window.removeEventListener("resize", resizeFunction);
  }, []);
}
