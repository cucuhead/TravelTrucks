import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast"; // 1. Importlar
import css from "./BookingForm.module.css";

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 2. Bildirimi göster
    toast.success("Booking successful!", {
      duration: 4000,
      position: "top-center",
      style: {
        background: "#101828",
        color: "#fff",
        borderRadius: "10px",
      },
    });

    // 3. Formu sıfırla (Opsiyonel ama iyi bir pratik)
    e.target.reset();
    setStartDate(null);
  };

  return (
    <div className={css.formContainer}>
      {/* 4. Toaster bileşenini buraya ekliyoruz */}
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
  placeholderText="Booking date*"
  className={css.input}
  calendarClassName={css.customCalendar}
  dateFormat="dd/MM/yyyy"
  // Hataya sebep olan popperModifiers yerine sadece bunu kullanıyoruz:
  popperPlacement="bottom-start" 
  popperClassName={css.popperFixed} // Özel bir sınıf ekledik
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