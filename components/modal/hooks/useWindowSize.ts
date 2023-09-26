import { useLayoutEffect, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });

  useLayoutEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window?.innerWidth,
        height: window?.innerHeight - 100,
      });
    }

    window?.addEventListener("resize", handleResize);
    handleResize();

    // Remove event listener on cleanup
    return () => window?.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return {
    windowSize,
    isMobile: typeof windowSize.width === "number" && windowSize.width < 768,
    isDesktop: typeof windowSize.width === "number" && windowSize.width >= 768,
  };
}
