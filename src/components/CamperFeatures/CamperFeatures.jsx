import css from "./CamperFeatures.module.css";

// İkon listene (image_782ac6.png ve image_7832c3.png) göre yolları güncelledim
import diagramIcon from "../../assets/icons/diagram.svg";
import fuelIcon from "../../assets/icons/Group.svg";       // Petrol/Yakıt
import windIcon from "../../assets/icons/wind.svg";        // AC
import cupIcon from "../../assets/icons/cup-hot.svg";      // Kitchen
import radioIcon from "../../assets/icons/ui-radios.svg";  // Yeni eklediğin Radyo ikonu
import tvIcon from "../../assets/icons/tv.svg";
import showerIcon from "../../assets/icons/ph_shower.svg"; // Bathroom

const CamperFeatures = ({ camper }) => {
  return (
    <div className={css.container}>
      {/* 1. Bölüm: Özellik Rozetleri */}
      <ul className={css.badgeList}>
        <li className={css.badge}>
          <img src={diagramIcon} alt="Transmission" className={css.icon} />
          <span className={css.capitalize}>{camper.transmission}</span>
        </li>
        <li className={css.badge}>
          <img src={fuelIcon} alt="Petrol" className={css.icon} />
          <span className={css.capitalize}>{camper.engine}</span>
        </li>
        {camper.AC && (
          <li className={css.badge}>
            <img src={windIcon} alt="AC" className={css.icon} />
            <span>AC</span>
          </li>
        )}
        {camper.kitchen && (
          <li className={css.badge}>
            <img src={cupIcon} alt="Kitchen" className={css.icon} />
            <span>Kitchen</span>
          </li>
        )}
        {camper.radio && (
          <li className={css.badge}>
            <img src={radioIcon} alt="Radio" className={css.icon} />
            <span>Radio</span>
          </li>
        )}
        {camper.bathroom && (
          <li className={css.badge}>
            <img src={showerIcon} alt="Bathroom" className={css.icon} />
            <span>Bathroom</span>
          </li>
        )}
        {camper.TV && (
          <li className={css.badge}>
            <img src={tvIcon} alt="TV" className={css.icon} />
            <span>TV</span>
          </li>
        )}
      </ul>

      {/* 2. Bölüm: Vehicle Details Tablosu */}
      <div className={css.detailsWrapper}>
        <h3 className={css.detailsTitle}>Vehicle details</h3>
        <div className={css.divider}></div>
        
        <ul className={css.detailsList}>
          {["form", "length", "width", "height", "tank", "consumption"].map((key) => (
            <li key={key} className={css.detailsItem}>
              <span className={css.capitalize}>{key}</span>
              <span className={css.capitalize}>{camper[key]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CamperFeatures;