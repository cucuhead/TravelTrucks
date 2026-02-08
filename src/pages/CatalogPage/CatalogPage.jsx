import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { selectCampers, selectIsLoading } from "../../redux/selectors";
import { setFilters } from "../../redux/slices/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import css from "./CatalogPage.module.css";

// İkon importlarını aynen koruyoruz...
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
  const hasMore = useSelector((state) => state.campers.hasMore); // Yeni eklediğimiz kontrol

  // UI Local State
  const [localLocation, setLocalLocation] = useState(activeFilters.location);
  const [localEquipment, setLocalEquipment] = useState(activeFilters.equipment);
  const [localType, setLocalType] = useState(activeFilters.type);
  const [page, setPage] = useState(1); // visibleCount yerine gerçek sayfa takibi

  // İlk yüklemede 1. sayfayı çek
  useEffect(() => {
    dispatch(fetchCampers({ ...activeFilters, page: 1 }));
  }, [dispatch]);

  const handleTypeSelect = (id) => {
    setLocalType((prev) => (prev === id ? "" : id));
  };

  const toggleEquipment = (id) => {
    setLocalEquipment((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Search butonu: Sayfayı 1'e sıfırla ve yeni filtrelerle ara
  const handleSearch = () => {
    const searchParams = {
      location: localLocation.trim(),
      type: localType,
      equipment: [...localEquipment],
    };

    dispatch(setFilters(searchParams));
    setPage(1); // Sayfa numarasını başa sar
    dispatch(fetchCampers({ ...searchParams, page: 1 })); 
  };

  // Load More butonu: Sayfayı artır ve yeni veriyi çek
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchCampers({ ...activeFilters, page: nextPage }));
  };

  // İkon verilerini aynen koruyoruz...
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
        {/* Sidebar içeriği aynen kalıyor... */}
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
        {isLoading && page === 1 && <p className={css.infoText}>Loading vehicles...</p>}
        
        <div className={css.list}>
          {campersFromStore.length > 0 ? (
            campersFromStore.map((camper) => <CamperCard key={camper.id} camper={camper} />)
          ) : (
            !isLoading && <p className={css.noResults}>No campers found.</p>
          )}
        </div>

        {/* hasMore kontrolü ve Loading durumu */}
        {hasMore && campersFromStore.length > 0 && (
          <button 
            className={css.loadMore} 
            onClick={handleLoadMore}
            disabled={isLoading}
            style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
          >
            {isLoading ? "Loading..." : "Load more"}
          </button>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;