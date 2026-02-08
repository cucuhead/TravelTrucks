import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { selectCampers, selectIsLoading } from "../../redux/selectors";
import { setFilters } from "../../redux/slices/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./CatalogPage.module.css";

// Yeni ve Temiz İkon Importları
import mapPinIcon from "../../assets/icons/map.svg";
import acIcon from "../../assets/icons/ac.svg";
import diagramIcon from "../../assets/icons/diagram.svg";
import kitchenIcon from "../../assets/icons/kitchen.svg";
import tvIcon from "../../assets/icons/tv.svg";
import bathroomIcon from "../../assets/icons/bathroom.svg";
import vanIcon from "../../assets/icons/type-van.svg";
import fullyIcon from "../../assets/icons/type-fully.svg";
import alcoveIcon from "../../assets/icons/type-alcove.svg";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campersFromStore = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  
  const activeFilters = useSelector((state) => state.campers.filters);

  // UI Local State
  const [localLocation, setLocalLocation] = useState(activeFilters.location);
  const [localEquipment, setLocalEquipment] = useState(activeFilters.equipment);
  const [localType, setLocalType] = useState(activeFilters.type);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    dispatch(fetchCampers(activeFilters));
  }, [dispatch]);

  const handleTypeSelect = (id) => {
    setLocalType((prev) => (prev === id ? "" : id));
  };

  const toggleEquipment = (id) => {
    setLocalEquipment((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCampers = useMemo(() => {
    if (!campersFromStore) return [];
    return campersFromStore.filter((camper) => {
      if (activeFilters.type && camper.form !== activeFilters.type) return false;
      return activeFilters.equipment.every((eq) => {
        if (eq === "transmission") return camper.transmission === "automatic";
        return camper[eq] === true;
      });
    });
  }, [campersFromStore, activeFilters]);

  const handleSearch = () => {
    const searchParams = {
      location: localLocation.trim(),
      type: localType,
      equipment: [...localEquipment],
    };

    dispatch(setFilters(searchParams));
    dispatch(fetchCampers(searchParams)); 
    setVisibleCount(4);
  };

  // İkon Eşleştirmeleri Güncellendi
  const equipmentData = [
    { id: "AC", label: "AC", icon: acIcon },
    { id: "transmission", label: "Automatic", icon: diagramIcon },
    { id: "kitchen", label: "Kitchen", icon: kitchenIcon },
    { id: "TV", label: "TV", icon: tvIcon },
    { id: "bathroom", label: "Bathroom", icon: bathroomIcon },
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
              value={localLocation}
              onChange={(e) => setLocalLocation(e.target.value)}
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
                  className={`${css.filterItem} ${localEquipment.includes(f.id) ? css.active : ""}`}
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
                  className={`${css.filterItem} ${localType === f.id ? css.active : ""}`}
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
        {/* Yarın buradaki infoText yerine karavanlı loader gelecek */}
        {isLoading && <p className={css.infoText}>Loading vehicles...</p>}
        
        <div className={css.list}>
          {filteredCampers.length > 0 ? (
            filteredCampers
              .slice(0, visibleCount)
              .map((camper) => <CamperCard key={camper.id} camper={camper} />)
          ) : (
            !isLoading && <p className={css.noResults}>No campers found.</p>
          )}
        </div>

        {filteredCampers.length > visibleCount && !isLoading && (
          <button 
            className={css.loadMore} 
            onClick={() => setVisibleCount(prev => prev + 4)}
            style={{ cursor: "pointer" }}
          >
            Load more
          </button>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;