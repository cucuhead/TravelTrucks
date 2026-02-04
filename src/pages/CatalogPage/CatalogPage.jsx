import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { selectCampers, selectIsLoading } from "../../redux/selectors"; // selectFilters selector'ını eklemeyi unutmayın
import { setFilters } from "../../redux/slices/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./CatalogPage.module.css";

// İkon importları
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
  
  // Redux'taki filtreleri alıyoruz (Selector'unuz yoksa state.campers.filters olarak kullanın)
  const activeFilters = useSelector((state) => state.campers.filters);

  // UI Local State (Yazarken anlık değişen ama Search'e basınca Redux'a giden alanlar)
  const [localLocation, setLocalLocation] = useState(activeFilters.location);
  const [localEquipment, setLocalEquipment] = useState(activeFilters.equipment);
  const [localType, setLocalType] = useState(activeFilters.type);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    // Sayfa açıldığında mevcut filtrelerle veri çek
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

  // Frontend Süzgeci (MockAPI kısıtları için)
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

    // ÖDEV KRİTERİ: Filtreleri global state'e yazıyoruz
    dispatch(setFilters(searchParams));
    // ÖDEV KRİTERİ: Yeni filtre ile backend'den veri çekiyoruz
    dispatch(fetchCampers(searchParams)); 
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
          <button className={css.loadMore} onClick={() => setVisibleCount(prev => prev + 4)}>
            Load more
          </button>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;