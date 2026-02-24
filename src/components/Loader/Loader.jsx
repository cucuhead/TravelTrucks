import { useEffect } from "react";
import css from "./Loader.module.css";

const Loader = () => {
 useEffect(() => {
  const originalBodyOverflow = document.body.style.overflow;
  const originalHtmlOverflow = document.documentElement.style.overflow;

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = originalBodyOverflow || "unset";
    document.documentElement.style.overflow = originalHtmlOverflow || "unset";
  };
}, []);

  return (
    <div className={`${css.loaderWrapper} ${css.noScroll}`}>
      <div className={css.movingContainer}>
        <img 
          src="/icons8-camper.png" 
          alt="Loading..." 
          className={css.camper} 
        />
        
        <div className={css.road}>
          <div className={css.line}></div>
          <div className={css.line}></div>
          <div className={css.line}></div>
        </div>
      </div>
      <p className={css.text}>TravelTrucks is on the way...</p>
    </div>
  );
};

export default Loader;