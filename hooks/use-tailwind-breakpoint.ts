import { useMediaQuery } from "usehooks-ts";

export function useTailwindBreakpoint() {
  const isSm = useMediaQuery("(min-width: 640px)"); // sm
  const isMd = useMediaQuery("(min-width: 768px)"); // md
  const isLg = useMediaQuery("(min-width: 1024px)"); // lg
  const isXl = useMediaQuery("(min-width: 1280px)"); // xl
  const is2xl = useMediaQuery("(min-width: 1536px)"); // 2xl

  return { isSm, isMd, isLg, isXl, is2xl };
}
