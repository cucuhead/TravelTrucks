import { useNavigate } from 'react-router-dom';
import css from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <section className={css.hero}>
      <div className={css.content}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.subtitle}>
          You can find everything you want in our catalog
        </p>
        <button 
          className={css.ctaButton} 
          onClick={() => navigate('/catalog')}
        >
          View Now
        </button>
      </div>
    </section>
  );
}