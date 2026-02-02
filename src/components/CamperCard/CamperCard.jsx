import css from "./CamperCard.module.css";
// İkonlarımızı import ediyoruz
import heartIcon from "../../assets/icons/heart (1).svg";
import starIcon from "../../assets/icons/star.svg";
import mapIcon from "../../assets/icons/map.svg";
import transmissionIcon from "../../assets/icons/diagram.svg";
import engineIcon from "../../assets/icons/cup-hot.svg"; // Fuel/Petrol için genellikle bu kullanılır
import acIcon from "../../assets/icons/wind.svg";
import kitchenIcon from "../../assets/icons/cup-hot.svg"; // Eğer özel kitchen ikonun yoksa

const CamperCard = ({ camper }) => {
  const mainImage = camper.gallery[0]?.thumb;

  return (
    <div className={css.card}>
      {/* Sol taraf: Görsel */}
      <div className={css.imageWrapper}>
        <img src={mainImage} alt={camper.name} className={css.image} />
      </div>

      {/* Sağ taraf: Detaylar */}
      <div className={css.details}>
        <div className={css.header}>
          <div className={css.titleBox}>
            <h2 className={css.name}>{camper.name}</h2>
            <div className={css.priceBox}>
              <span className={css.price}>€{camper.price.toFixed(2)}</span>
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

        <p className={css.description}>{camper.description}</p>

        {/* Özellik Badge'leri */}
        <div className={css.categories}>
          <div className={css.badge}>
            <img src={transmissionIcon} alt="" className={css.badgeIcon} />
            <span>{camper.transmission}</span>
          </div>
          <div className={css.badge}>
            <img src={engineIcon} alt="" className={css.badgeIcon} />
            <span>{camper.engine}</span>
          </div>
          {camper.AC && (
            <div className={css.badge}>
              <img src={acIcon} alt="" className={css.badgeIcon} />
              <span>AC</span>
            </div>
          )}
          {camper.kitchen && (
            <div className={css.badge}>
              <img src={kitchenIcon} alt="" className={css.badgeIcon} />
              <span>Kitchen</span>
            </div>
          )}
        </div>

        <button className={css.showMore}>Show more</button>
      </div>
    </div>
  );
};

export default CamperCard;