import { useEffect, useState } from "react";

const useScrollTopWindow = () => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    setScrollTop(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollTopWindow: scrollTop };
};

export default useScrollTopWindow;
