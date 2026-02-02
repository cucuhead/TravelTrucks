import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { selectCampers, selectIsLoading } from "../../redux/selectors";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./CatalogPage.module.css";

// İkonlar
import mapPinIcon from "../../assets/icons/map.svg";
import windIcon from "../../assets/icons/wind.svg";
import diagramIcon from "../../assets/icons/diagram.svg";
import cupHotIcon from "../../assets/icons/cup-hot.svg";
import tvIcon from "../../assets/icons/tv.svg";
import showerIcon from "../../assets/icons/ph_shower.svg";
import vanIcon from "../../assets/icons/bi_grid-1x2.svg"; 
import fullyIcon from "../../assets/icons/bi_grid-1x2.svg";
import alcoveIcon from "../../assets/icons/bi_grid-3x3-gap.svg"; 

const CatalogPage = () => {
  const dispatch = useDispatch();
  const allCampers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);

  // State Yönetimi
  const [location, setLocation] = useState("");
  const [equipmentFilters, setEquipmentFilters] = useState([]); // Çoklu seçim
  const [typeFilter, setTypeFilter] = useState(""); // Tekli seçim
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    // Sayfa ilk açıldığında tüm araçları getir
    dispatch(fetchCampers());
  }, [dispatch]);

  // Ekipman Toggle (Çoklu Seçim)
  const toggleEquipment = (id) => {
    setEquipmentFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Araç Tipi Seçimi (Tekli Seçim)
  const handleTypeSelect = (id) => {
    setTypeFilter((prev) => (prev === id ? "" : id));
  };

  // KRİTİK: Backend Filtreleme Tetikleyicisi
  const handleSearch = () => {
    const filters = {
      location: location.trim(),
      form: typeFilter,
      // Seçili ekipmanları backend'in beklediği boolean formatına sokuyoruz
      AC: equipmentFilters.includes("AC"),
      kitchen: equipmentFilters.includes("kitchen"),
      TV: equipmentFilters.includes("TV"),
      bathroom: equipmentFilters.includes("bathroom"),
      transmission: equipmentFilters.includes("transmission") ? "automatic" : "",
    };

    // Filtreleri operations'a gönderiyoruz (Backend'e istek gider)
    dispatch(fetchCampers(filters));
    setVisibleCount(4); // Listeyi en başa sarıyoruz
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);
  const visibleCampers = allCampers.slice(0, visibleCount);

  // Filtre Verileri
  const equipmentData = [
    { id: "AC", label: "AC", icon: windIcon },
    { id: "transmission", label: "Automatic", icon: diagramIcon },
    { id: "kitchen", label: "Kitchen", icon: cupHotIcon },
    { id: "TV", label: "TV", icon: tvIcon },
    { id: "bathroom", label: "Bathroom", icon: showerIcon },
  ];

  const typeData = [
    { id: "panelTruck", label: "Van", icon: vanIcon },
    { id: "fullyIntegrated", label: "Fully Integrated", icon: fullyIcon },
    { id: "alcove", label: "Alcove", icon: alcoveIcon },
  ];

  return (
    <div className={css.container}>
      {/* SIDEBAR */}
      <aside className={css.sidebar}>
        <div className={css.locationSection}>
          <label className={css.locationLabel}>Location</label>
          <div className={css.inputWrapper}>
            <img src={mapPinIcon} className={css.mapIcon} alt="location" />
            <input 
              type="text" 
              placeholder="City, Country" 
              className={css.locationInput} 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className={css.filtersSection}>
          <p className={css.filterTitle}>Filters</p>
          
          {/* Equipment Group */}
          <div className={css.filterGroup}>
            <h3 className={css.groupHeading}>Vehicle equipment</h3>
            <hr className={css.divider} />
            <div className={css.filterGrid}>
              {equipmentData.map((f) => (
                <button 
                  key={f.id} 
                  onClick={() => toggleEquipment(f.id)}
                  className={`${css.filterItem} ${equipmentFilters.includes(f.id) ? css.active : ""}`}
                >
                  <img src={f.icon} alt={f.label} className={css.filterIcon} />
                  <span className={css.filterLabel}>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Type Group */}
          <div className={css.filterGroup}>
            <h3 className={css.groupHeading}>Vehicle type</h3>
            <hr className={css.divider} />
            <div className={css.filterGrid}>
              {typeData.map((f) => (
                <button 
                  key={f.id} 
                  onClick={() => handleTypeSelect(f.id)}
                  className={`${css.filterItem} ${typeFilter === f.id ? css.active : ""}`}
                >
                  <img src={f.icon} alt={f.label} className={css.filterIcon} />
                  <span className={css.filterLabel}>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button className={css.searchBtn} onClick={handleSearch}>Search</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={css.content}>
        {isLoading && <p className={css.infoText}>Loading vehicles...</p>}
        {!isLoading && allCampers.length === 0 && (
          <p className={css.infoText}>No vehicles found. Try changing filters.</p>
        )}
        
        <div className={css.list}>
          {visibleCampers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
        
        {!isLoading && allCampers.length > visibleCount && (
          <button className={css.loadMore} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;