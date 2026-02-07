import starFull from "../../assets/icons/Rating (4).svg"; // Dolu yıldız
import starEmpty from "../../assets/icons/Rating (3).svg"; // Boş yıldız
import css from "./CamperReviews.module.css";

const CamperReviews = ({ reviews }) => {
  // 5 üzerinden yıldızları oluşturma fonksiyonu
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img 
          key={i} 
          src={i <= rating ? starFull : starEmpty} 
          alt="star" 
          className={css.starIcon} 
        />
      );
    }
    return stars;
  };

  return (
    <ul className={css.reviewsList}>
      {reviews.map((review, index) => (
        <li key={index} className={css.reviewItem}>
          <div className={css.reviewerHeader}>
            <div className={css.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div className={css.reviewerInfo}>
              <p className={css.name}>{review.reviewer_name}</p>
              <div className={css.starsBox}>{renderStars(review.reviewer_rating)}</div>
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default CamperReviews;