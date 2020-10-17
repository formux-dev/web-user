import { useLayoutEffect } from "react";

export default function useResize(resizeFunction) {
  useLayoutEffect(() => {
    window.addEventListener("resize", resizeFunction);
    return () => window.removeEventListener("resize", resizeFunction);
  }, []);
}
