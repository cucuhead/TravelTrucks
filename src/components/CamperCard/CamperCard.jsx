import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/slices/campersSlice";
import { selectFavorites } from "../../redux/selectors.js";
import css from "./CamperCard.module.css";

// Yeni ve Temiz İkon Importları
import starIcon from "../../assets/icons/star-full.svg"; 
import mapIcon from "../../assets/icons/map.svg";
import transmissionIcon from "../../assets/icons/diagram.svg"; 
import engineIcon from "../../assets/icons/fuel.svg"; // Group.svg -> fuel.svg oldu
import acIcon from "../../assets/icons/ac.svg"; // wind.svg -> ac.svg oldu
import kitchenIcon from "../../assets/icons/kitchen.svg"; // cup-hot.svg -> kitchen.svg oldu
import bathroomIcon from "../../assets/icons/bathroom.svg"; // ph_shower.svg -> bathroom.svg oldu
import tvIcon from "../../assets/icons/tv.svg";
import heartDefault from "../../assets/icons/heart-default.svg";
import heartActive from "../../assets/icons/heart-active.svg";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites) || [];
  
  const isFavorite = favorites.includes(camper.id);

  const mainImage = camper.gallery?.[0]?.thumb || "";

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const handleFavoriteClick = (e) => {
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
                style={{ cursor: "pointer" }} // Mülakat kriteri
              >
                {/* SVG bileşeni yerine doğrudan Figma ikonlarını kullanıyoruz */}
                <img 
                  src={isFavorite ? heartActive : heartDefault} 
                  alt="favorite" 
                />
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
          style={{ cursor: "pointer" }} // Mülakat kriteri
        >
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;