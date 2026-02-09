import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import css from "./BookingForm.module.css";

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);
  // Fokus durumunu takip etmek için yeni state
  const [isFocused, setIsFocused] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    toast.success("Booking successful!", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "#101828",
        color: "#fff",
        borderRadius: "10px",
      },
    });

    e.target.reset();
    setStartDate(null);
  };

  return (
    <div className={css.formContainer}>
      <Toaster /> 
      
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      
      <form className={css.form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Name*" className={css.input} required />
        <input type="email" placeholder="Email*" className={css.input} required />
        
        <div className={css.dateWrapper}>
          <DatePicker
            formatWeekDay={name => name.toUpperCase().substring(0, 3)}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            // --- DEĞİŞİKLİK BURADA ---
            // Odaklanıldığında veya tarih seçildiğinde yazı değişir
            placeholderText={isFocused || startDate ? "Select a date between today" : "Booking date*"}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            // ------------------------
            className={css.input}
            calendarClassName={css.customCalendar}
            dateFormat="dd/MM/yyyy"
            popperPlacement="bottom-start" 
            popperClassName={css.popperFixed}
            shouldCloseOnSelect={true}
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