import { useEffect, useState } from "react";

const FilterPanel = ({ filters, setFilters, doctors }) => {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const uniqueSpecs = Array.from(
      new Set(doctors.map((doc) => doc.specialty))
    );
    setSpecialties(uniqueSpecs);
  }, [doctors]);

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFilters((prev) => ({
        ...prev,
        specialties: [...prev.specialties, value],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        specialties: prev.specialties.filter((spec) => spec !== value),
      }));
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Consultation Type:</strong>
        <select
          value={filters.consultationType}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              consultationType: e.target.value,
            }))
          }
        >
          <option value="">All</option>
          <option value="online">Online</option>
          <option value="in-person">In-person</option>
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Specialties:</strong>
        {specialties.map((spec) => (
          <label key={spec} style={{ display: "block" }}>
            <input
              type="checkbox"
              value={spec}
              checked={filters.specialties.includes(spec)}
              onChange={handleSpecialtyChange}
            />
            {spec}
          </label>
        ))}
      </div>

      <div>
        <strong>Sort by:</strong>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              sortBy: e.target.value,
            }))
          }
        >
          <option value="">None</option>
          <option value="fees">Fees (Low to High)</option>
          <option value="experience">Experience (High to Low)</option>
          <option value="specialty">Specialty (A-Z)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;