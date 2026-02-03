import { Link } from "react-router-dom";
import css from "./CamperCard.module.css";

// Icons
import heartIcon from "../../assets/icons/heart (1).svg";
import starIcon from "../../assets/icons/star.svg";
import mapIcon from "../../assets/icons/map.svg";
import transmissionIcon from "../../assets/icons/diagram.svg"; 
import engineIcon from "../../assets/icons/Group.svg"; 
import acIcon from "../../assets/icons/wind.svg"; 
import kitchenIcon from "../../assets/icons/cup-hot.svg"; 
import bathroomIcon from "../../assets/icons/ph_shower.svg";
import tvIcon from "../../assets/icons/tv.svg";

const CamperCard = ({ camper }) => {
  const mainImage = camper.gallery[0]?.thumb;

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // 🔥 FEATURE CONFIG (tek kaynak)
  const features = [
    { key: "AC", label: "AC", icon: acIcon },
    { key: "kitchen", label: "Kitchen", icon: kitchenIcon },
    { key: "bathroom", label: "Bathroom", icon: bathroomIcon },
    { key: "TV", label: "TV", icon: tvIcon },
  ];

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img src={mainImage} alt={camper.name} className={css.image} />
      </div>

      <div className={css.details}>
        {/* HEADER */}
        <div className={css.header}>
          <div className={css.titleBox}>
            <h2 className={css.name}>{camper.name}</h2>
            <div className={css.priceBox}>
              <span className={css.price}>
                €{Number(camper.price).toFixed(2)}
              </span>
              <button className={css.heartBtn}>
                <img src={heartIcon} alt="Favorite" className={css.iconHeart} />
              </button>
            </div>
          </div>

          <div className={css.meta}>
            <div className={css.ratingBox}>
              <img src={starIcon} alt="Rating" className={css.iconStar} />
              <span className={css.ratingText}>
                {camper.rating} ({camper.reviews.length} Reviews)
              </span>
            </div>

            <div className={css.locationBox}>
              <img src={mapIcon} alt="Location" className={css.iconMap} />
              <span className={css.locationText}>{camper.location}</span>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className={css.description}>{camper.description}</p>

        {/* CATEGORIES */}
        <div className={css.categories}>
          <div className={css.badge}>
            <img src={transmissionIcon} alt="" className={css.badgeIcon} />
            <span className={css.badgeText}>
              {capitalize(camper.transmission)}
            </span>
          </div>

          <div className={css.badge}>
            <img src={engineIcon} alt="" className={css.badgeIcon} />
            <span className={css.badgeText}>
              {capitalize(camper.engine)}
            </span>
          </div>

          {/* ✅ DYNAMIC FEATURES (STRICT BOOLEAN) */}
          {features.map(({ key, label, icon }) =>
            camper[key] === true ? (
              <div className={css.badge} key={key}>
                <img src={icon} alt={label} className={css.badgeIcon} />
                <span className={css.badgeText}>{label}</span>
              </div>
            ) : null
          )}
        </div>

        <Link
          to={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={css.showMore}
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;
