import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { selectCampers, selectIsLoading } from "../../redux/selectors";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./CatalogPage.module.css";

// İkon importları (Dosya yollarını kontrol etmeyi unutma)
import mapPinIcon from "../../assets/icons/map.svg";
import windIcon from "../../assets/icons/wind.svg";
import diagramIcon from "../../assets/icons/diagram.svg";
import cupHotIcon from "../../assets/icons/cup-hot.svg";
import tvIcon from "../../assets/icons/tv.svg";
import showerIcon from "../../assets/icons/ph_shower.svg";
import vanIcon from "../../assets/icons/bi_grid-1x2.svg";
import fullyIcon from "../../assets/icons/bi_grid (1).svg";
import alcoveIcon from "../../assets/icons/bi_grid-3x3-gap.svg";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campersFromStore = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);

  const [location, setLocation] = useState("");
  const [equipmentFilters, setEquipmentFilters] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  
  // ARAMA STATE: Sadece "Search" butonuna basınca bu state güncellenir.
  const [activeFilters, setActiveFilters] = useState({
    location: "",
    equipment: [],
    type: "",
  });

  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);

  // 1. Yazım hatasını düzelttik: handleTypeSelect
  const handleTypeSelect = (id) => {
    setTypeFilter((prev) => (prev === id ? "" : id));
  };

  const toggleEquipment = (id) => {
    setEquipmentFilters((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 2. KESİN ÇÖZÜM (Frontend Süzgeci): 
  // MockAPI bazen "bathroom"u kaldırsan da hepsini yollar. 
  // Burası sadece seçili olanların ekranda kalmasını garanti eder.
  const filteredCampers = useMemo(() => {
    if (!campersFromStore) return [];

    return campersFromStore.filter((camper) => {
      // Tip Süzgeci
      if (activeFilters.type && camper.form !== activeFilters.type) return false;
      
      // Ekipman Süzgeci (Bathroom, TV, AC vb.)
      // Eğer bir ekipman activeFilters.equipment içindeyse, araçta o özellik MUTLAKA olmalı.
      // İçinde değilse, araçta o özelliğin olup olmaması önemli değil (Kriter böyle diyor).
      return activeFilters.equipment.every((eq) => {
        if (eq === "transmission") return camper.transmission === "automatic";
        return camper[eq] === true;
      });
    });
  }, [campersFromStore, activeFilters]);

  const handleSearch = () => {
     console.log("Arama kriterleri:", equipmentFilters);
    const searchParams = {
      location: location.trim(),
      type: typeFilter,
      equipment: [...equipmentFilters], // Referans değişimi için spread
    };
   
    
    setActiveFilters(searchParams);
    dispatch(fetchCampers(searchParams)); // Backend'e istek at (Ödev kriteri)
    setVisibleCount(4); 
  };

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
          <div className={css.filterGroup}>
            <h3 className={css.groupHeading}>Vehicle equipment</h3>
            <hr className={css.divider} />
            <div className={css.filterGrid}>
              {equipmentData.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggleEquipment(f.id)}
                  style={{ cursor: "pointer" }}
                  className={`${css.filterItem} ${equipmentFilters.includes(f.id) ? css.active : ""}`}
                >
                  <img src={f.icon} alt={f.label} />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={css.filterGroup}>
            <h3 className={css.groupHeading}>Vehicle type</h3>
            <hr className={css.divider} />
            <div className={css.filterGrid}>
              {typeData.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => handleTypeSelect(f.id)}
                  style={{ cursor: "pointer" }}
                  className={`${css.filterItem} ${typeFilter === f.id ? css.active : ""}`}
                >
                  <img src={f.icon} alt={f.label} />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button className={css.searchBtn} onClick={handleSearch} style={{ cursor: "pointer" }}>
            Search
          </button>
        </div>
      </aside>

      <main className={css.content}>
        {isLoading && <p className={css.infoText}>Loading vehicles...</p>}

        <div className={css.list}>
          {filteredCampers.length > 0 ? (
            filteredCampers
              .slice(0, visibleCount)
              .map((camper) => <CamperCard key={camper.id} camper={camper} />)
          ) : (
            !isLoading && (
              <div className={css.noResults}>
                <p>No campers found matching your filters.</p>
              </div>
            )
          )}
        </div>

        {filteredCampers.length > visibleCount && !isLoading && (
          <button
            className={css.loadMore}
            style={{ cursor: "pointer" }}
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Load more
          </button>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;