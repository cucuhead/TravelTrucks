import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { selectCampers, selectIsLoading } from "../../redux/selectors";
import { setFilters } from "../../redux/slices/campersSlice";
import CamperCard from "../../components/CamperCard/CamperCard";
import Loader from "../../components/Loader/Loader"; 
import css from "./CatalogPage.module.css";


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
  const hasMore = useSelector((state) => state.campers.hasMore);

  const [localLocation, setLocalLocation] = useState(activeFilters.location);
  const [localEquipment, setLocalEquipment] = useState(activeFilters.equipment);
  const [localType, setLocalType] = useState(activeFilters.type);
  const [page, setPage] = useState(1);

  // SCROLL KONTROLÜ İÇİN: Sonuç var mı?
  const hasResults = campersFromStore.length > 0;

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

  const handleSearch = () => {
    const searchParams = {
      location: localLocation.trim(),
      type: localType,
      equipment: [...localEquipment],
    };
    dispatch(setFilters(searchParams));
    setPage(1);
    dispatch(fetchCampers({ ...searchParams, page: 1 })); 
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchCampers({ ...activeFilters, page: nextPage }));
  };

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
    // noScroll sınıfını burada hasResults'a göre ekliyoruz
    <div className={`${css.container} ${!hasResults && !isLoading ? css.noScroll : ""}`}>
      <aside className={css.sidebar}>
        <div className={css.locationSection}>
          <label className={css.locationLabel}>Location</label>
          <div className={css.inputWrapper}>
            <img src={mapPinIcon} className={css.mapIcon} alt="location" />
            <input
              type="text"
              placeholder="City"
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
                  className={`${css.filterItem} ${localType === f.id ? css.active : ""}`}
                >
                  <img src={f.icon} alt={f.label} />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button className={css.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </aside>

      <main className={css.content}>
        {/* İlk yükleme loader'ı merkezi alanda */}
        {isLoading && page === 1 && (
          <div className={css.loaderCentered}>
            <Loader />
          </div>
        )}
        
        <div className={css.list}>
          {hasResults ? (
            campersFromStore.map((camper) => <CamperCard key={camper.id} camper={camper} />)
          ) : (
            !isLoading && (
              <div className={css.noResults}>
                <p>No campers found with selected filters.</p>
              </div>
            )
          )}
        </div>

        {/* Sayfalamada buton üstünde loader */}
        {isLoading && page > 1 && (
          <div className={css.loaderCentered}>
            <Loader />
          </div>
        )}

        {hasMore && !isLoading && hasResults && (
          <button className={css.loadMore} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </main>
    </div>
  );
};

export default CatalogPage;