import React, { createContext, useState, useContext, useEffect, useRef } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const [showLoader, setShowLoader] = useState(false);
  const hideTimeout = useRef(null);

  const startLoading = () => {
    // If something starts, clear hide timeout and show loader immediately
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setLoadingCount((prev) => prev + 1);
    setShowLoader(true);
  };

  const stopLoading = () => {
    setLoadingCount((prev) => {
      const newCount = Math.max(prev - 1, 0);
      if (newCount === 0) {
        // add delay before hiding
        hideTimeout.current = setTimeout(() => {
          setShowLoader(false);
        }, 400); // 400ms debounce
      }
      return newCount;
    });
  };

  useEffect(() => {
    document.documentElement.style.overflow = showLoader ? "hidden" : "auto";
    return () => {
      document.documentElement.style.overflow = "auto";
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [showLoader]);

  return (
    <LoaderContext.Provider value={{ loading: showLoader, startLoading, stopLoading }}>
      {showLoader && <div className="full_page_loader"><img src="/assets/images/dawn_loading.gif" alt="" /></div>}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);
