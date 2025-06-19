import { useEffect, useState } from "react";

const useScrollTop = (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scrollContainer, setscrollContainer] = useState<any>();

  useEffect(() => {
    if (id) {
      const dom = document.querySelector(`#${id}`);
      if (dom) {
        setscrollContainer(dom);
      }
    }
  }, [id]);

  const [scrollTop, setScrollTop] = useState(0);
  const handleScroll = () => {
    setScrollTop(scrollContainer.scrollTop);
  };

  useEffect(() => {
    if (scrollContainer && handleScroll) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainer, handleScroll]);

  return {
    scrollTop,
    clientHeight: scrollContainer?.clientHeight ?? null,
    scrollHieght: scrollContainer?.scrollHeight ?? null,
  };
};

export default useScrollTop;
