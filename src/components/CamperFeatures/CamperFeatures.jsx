import css from "./CamperFeatures.module.css";

// Mevcut İkonlar
import diagramIcon from "../../assets/icons/diagram.svg";
import fuelIcon from "../../assets/icons/fuel.svg";
import acIcon from "../../assets/icons/ac.svg";
import kitchenIcon from "../../assets/icons/kitchen.svg";
import radioIcon from "../../assets/icons/radio.svg";
import tvIcon from "../../assets/icons/tv.svg";
import bathroomIcon from "../../assets/icons/bathroom.svg";

// Hata Düzeltilen ve Yeni Eklenen İkonlar
import waterIcon from "../../assets/icons/ion_water-outline.svg";
import fridgeIcon from "../../assets/icons/solar_fridge-outline.svg"; // 'fringe' hatası 'fridge' olarak düzeltildi
import gasIcon from "../../assets/icons/hugeicons_gas-stove.svg";
import microwaveIcon from "../../assets/icons/lucide_microwave.svg";

const CamperFeatures = ({ camper }) => {
  // Verideki 'water: true' gibi alanları yakalamak için eşleştirme listesi
  const equipment = [
    { id: "AC", label: "AC", icon: acIcon },
    { id: "kitchen", label: "Kitchen", icon: kitchenIcon },
    { id: "radio", label: "Radio", icon: radioIcon },
    { id: "bathroom", label: "Bathroom", icon: bathroomIcon },
    { id: "TV", label: "TV", icon: tvIcon },
    { id: "water", label: "Water", icon: waterIcon }, // Senin yakaladığın eksik 'water'
    { id: "refrigerator", label: "Refrigerator", icon: fridgeIcon },
    { id: "gas", label: "Gas", icon: gasIcon },
    { id: "microwave", label: "Microwave", icon: microwaveIcon },
  ];

  return (
    <div className={css.container}>
      {/* 1. Bölüm: Özellik Rozetleri */}
      <ul className={css.badgeList}>
        <li className={css.badge}>
          <img src={diagramIcon} alt="Transmission" className={css.icon} />
          <span className={css.capitalize}>{camper.transmission}</span>
        </li>
        <li className={css.badge}>
          <img src={fuelIcon} alt="Fuel" className={css.icon} />
          <span className={css.capitalize}>{camper.engine}</span>
        </li>

        {/* Dinamik Ekipmanlar: Veride true olanlar burada listelenir */}
        {equipment.map(({ id, label, icon }) => 
          camper[id] === true && (
            <li className={css.badge} key={id}>
              <img src={icon} alt={label} className={css.icon} />
              <span>{label}</span>
            </li>
          )
        )}
      </ul>

      {/* 2. Bölüm: Araç Detayları */}
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