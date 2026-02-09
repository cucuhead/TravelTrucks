import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={`${css.loaderWrapper} ${css.noScroll}`}>
      <div className={css.movingContainer}>
        {/* public klasörüne attığın ikona doğrudan erişim */}
        <img src="/icons8-camper.png" alt="Loading..." className={css.camper}  />
        
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