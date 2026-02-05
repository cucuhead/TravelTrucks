import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookingForm.module.css";

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking successful!");
  };

  return (
    <div className={css.formContainer}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      
      <form className={css.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Name*" className={css.input} required />
        <input type="email" placeholder="Email*" className={css.input} required />
        
        <div className={css.dateWrapper}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Booking date*"
            className={css.input}
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>

        <textarea placeholder="Comment" className={css.textarea}></textarea>

        <button type="submit" className={css.submitBtn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;