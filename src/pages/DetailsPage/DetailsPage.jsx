import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/operations";
import { selectCurrentCamper, selectIsLoading } from "../../redux/selectors";

// Yeni oluşturduğun bileşeni import ediyoruz
import CamperFeatures from "../../components/CamperFeatures/CamperFeatures";

// İkonlar
import starIcon from "../../assets/icons/star.svg";
import mapIcon from "../../assets/icons/map.svg";

import css from "./DetailsPage.module.css";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const [activeTab, setActiveTab] = useState("features");

  const camper = useSelector(selectCurrentCamper);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (isLoading) return <div className={css.loader}>Loading...</div>;
  if (!camper) return null;

  return (
    <section className={css.container}>
      {/* Üst Başlık ve Bilgiler */}
      <div className={css.header}>
        <h2 className={css.name}>{camper.name}</h2>
        
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

        <p className={css.price}>€{Number(camper.price).toFixed(2)}</p>
      </div>

      {/* Galeri - Figma: 292x312px */}
      <div className={css.gallery}>
        {camper.gallery?.map((img, index) => (
          <div key={index} className={css.imageWrapper}>
            <img src={img.thumb} alt={camper.name} className={css.galleryImage} />
          </div>
        ))}
      </div>

      {/* Açıklama Metni */}
      <p className={css.description}>{camper.description}</p>
      
      {/* Sekmeler (Tabs) */}
      <div className={css.tabs}>
        <button 
          className={`${css.tab} ${activeTab === "features" ? css.activeTab : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button 
          className={`${css.tab} ${activeTab === "reviews" ? css.activeTab : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Alt İçerik Alanı */}
      <div className={css.contentWrapper}>
        <div className={css.leftContent}>
          {activeTab === "features" ? (
            /* ARTIK BURADA BİLEŞENİN ÇALIŞACAK */
            <CamperFeatures camper={camper} />
          ) : (
            <div className={css.reviewsPlaceholder}>
              {/* Buraya CamperReviews gelecek */}
              <p>Reviews content will be here...</p>
            </div>
          )}
        </div>

        <div className={css.rightContent}>
          {/* Rezervasyon Formu Alanı (Figma stiline uygun dış kutu) */}
          <div className={css.bookingFormWrapper}>
            <h3 className={css.formTitle}>Book your campervan now</h3>
            <p className={css.formSubtitle}>Stay connected! We are always ready to help you.</p>
            {/* Buraya BookingForm bileşeni gelecek */}
            <div className={css.placeholderForm}>[Form Fields Here]</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;