"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

const useScrollRestoration = () => {
  const router = useRouter();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;

    let shouldScrollRestore = false;
    window.history.scrollRestoration = "manual";

    const onBeforeUnload = (event) => {
      sessionStorage.setItem(
        router.asPath,
        JSON.stringify({ x: window.scrollX, y: window.scrollY })
      );
    };

    const onRouteChangeStart = () => {
      const scrollPos = { x: window.scrollX, y: window.scrollY };
      sessionStorage.setItem(router.asPath, JSON.stringify(scrollPos));
    };

    const onRouteChangeComplete = (url) => {
      const scrollPos = sessionStorage.getItem(url);
      shouldScrollRestore = true;
      if (scrollPos) {
        const { x, y } = JSON.parse(scrollPos);
        window.scrollTo(x, y);
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router]);
};

export default useScrollRestoration;
