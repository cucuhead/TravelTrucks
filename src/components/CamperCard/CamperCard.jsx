import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/slices/campersSlice";
import { selectFavorites } from "../../redux/selectors.js";
import css from "./CamperCard.module.css";

// Icons
import starIcon from "../../assets/icons/star.svg";
import mapIcon from "../../assets/icons/map.svg";
import transmissionIcon from "../../assets/icons/diagram.svg"; 
import engineIcon from "../../assets/icons/Group.svg"; 
import acIcon from "../../assets/icons/wind.svg"; 
import kitchenIcon from "../../assets/icons/cup-hot.svg"; 
import bathroomIcon from "../../assets/icons/ph_shower.svg";
import tvIcon from "../../assets/icons/tv.svg";

// SVG Bileşeni - Dosya dışında tanımlamak daha sağlıklıdır
const HeartIcon = ({ isFavorite }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isFavorite ? "#E44848" : "none"}
    stroke={isFavorite ? "#E44848" : "#101828"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: 'none' }} // Tıklamayı engellememesi için
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  // Selector'un varlığından ve doğru çalıştığından emin ol
  const favorites = useSelector(selectFavorites) || [];
  
  const isFavorite = favorites.includes(camper.id);

  const mainImage = camper.gallery?.[0]?.thumb || "";

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const handleFavoriteClick = (e) => {
    // Event bubbling'i engellemek gerekebilir
    e.preventDefault(); 
    dispatch(toggleFavorite(camper.id));
  };

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
        <div className={css.header}>
          <div className={css.titleBox}>
            <h2 className={css.name}>{camper.name}</h2>
            <div className={css.priceBox}>
              <span className={css.price}>
                €{Number(camper.price).toFixed(2)}
              </span>
              <button 
                className={css.heartBtn} 
                onClick={handleFavoriteClick}
                type="button"
                aria-label="favorite"
              >
                <HeartIcon isFavorite={isFavorite} />
              </button>
            </div>
          </div>

          <div className={css.meta}>
            <div className={css.ratingBox}>
              <img src={starIcon} alt="Rating" className={css.iconStar} />
              <span className={css.ratingText}>
                {camper.rating} ({camper.reviews?.length || 0} Reviews)
              </span>
            </div>

            <div className={css.locationBox}>
              <img src={mapIcon} alt="Location" className={css.iconMap} />
              <span className={css.locationText}>{camper.location}</span>
            </div>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

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