import React, { useLayoutEffect, useRef } from "react";
import "./PageLoader.css";

const PageLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const listenerRef = useRef<any>(null);

  useLayoutEffect(() => {
    const hideLoader = () => {
      if (loaderRef.current) {
        loaderRef.current.style.opacity = "0";
      }
    };

    if (document.readyState === "complete") {
      setTimeout(() => {
        hideLoader();
      }, 1000);
    } else {
      listenerRef.current = window.addEventListener("load", () => {
        setTimeout(() => {
          hideLoader();
        }, 2000);
      });
    }

    const watchLoaderTransition = () => {
      if (loaderRef.current) {
        loaderRef.current.style.display = "none";
      }
    };

    const loaderWrapper = document.getElementById("page-loader-wrapper");
    loaderWrapper?.addEventListener("transitionend", watchLoaderTransition);

    return () => {
      if (listenerRef.current) {
        window.removeEventListener("load", listenerRef.current);
      }
      loaderWrapper?.removeEventListener(
        "transitionend",
        watchLoaderTransition
      );
    };
  }, []);

  return (
    <div id="page-loader-wrapper" ref={loaderRef}>
      <h2 data-text="Home" className="animated-text">
        Home
      </h2>
    </div>
  );
};

export default PageLoader;
