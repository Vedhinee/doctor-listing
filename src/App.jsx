import { useState, useEffect } from "react";
import "./App.css";

const SPECIALTIES = [
  "General Physician", "Dentist", "Dermatologist", "Paediatrician",
  "Gynaecologist", "ENT", "Diabetologist", "Cardiologist", "Physiotherapist",
  "Endocrinologist", "Orthopaedic", "Ophthalmologist", "Gastroenterologist",
  "Pulmonologist", "Psychiatrist", "Urologist", "Dietitian/Nutritionist",
  "Psychologist", "Sexologist", "Nephrologist", "Neurologist", "Oncologist",
  "Ayurveda", "Homeopath"
];

function App() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [consultationType, setConsultationType] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    // Fetch doctor data
    fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data || []);
        setFilteredDoctors(data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Filtering and sorting logic
  useEffect(() => {
    let filtered = [...doctors];
    
    // 1. Filter by Consultation Type (Video Consult / In Clinic)
    if (consultationType) {
      if (consultationType === "Video Consult") {
        filtered = filtered.filter((doc) => doc.video_consult);
      } else if (consultationType === "In Clinic") {
        filtered = filtered.filter((doc) => doc.in_clinic);
      }
    }

    // 2. Filter by Specialties
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(
        (doc) =>
          Array.isArray(doc.specialities) &&
          doc.specialities.some((s) => selectedSpecialties.includes(s.name))
      );
    }

    // 3. Filter by Search (Doctor name)
    if (search) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 4. Sorting by Fees or Experience
    if (sortBy === "fees") {
      filtered = filtered.sort((a, b) => {
        const feeA = parseInt((a.fees || "").replace(/[^\d]/g, ""), 10) || 0;
        const feeB = parseInt((b.fees || "").replace(/[^\d]/g, ""), 10) || 0;
        return feeA - feeB;
      });
    } else if (sortBy === "experience") {
      filtered = filtered.sort((a, b) => {
        const expA =
          parseInt((a.experience || "").replace(/[^\d]/g, ""), 10) || 0;
        const expB =
          parseInt((b.experience || "").replace(/[^\d]/g, ""), 10) || 0;
        return expB - expA;
      });
    }

    // Update filtered list
    setFilteredDoctors(filtered);
  }, [doctors, consultationType, selectedSpecialties, search, sortBy]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleConsultationTypeChange = (e) => {
    setConsultationType(e.target.value);
  };

  const handleSpecialtyChange = (spec) => {
    setSelectedSpecialties((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for a doctor"
          className="search-input"
        />
      </div>

      {/* Consultation Type Filter */}
      <div className="consultation-type">
        <select
          value={consultationType}
          onChange={handleConsultationTypeChange}
        >
          <option value="">Select Consultation Type</option>
          <option value="Video Consult">Video Consult</option>
          <option value="In Clinic">In Clinic</option>
        </select>
      </div>

      {/* Specialties Filter */}
      <div className="specialties-filter">
        {SPECIALTIES.map((specialty) => (
          <label key={specialty}>
            <input
              type="checkbox"
              checked={selectedSpecialties.includes(specialty)}
              onChange={() => handleSpecialtyChange(specialty)}
            />
            {specialty}
          </label>
        ))}
      </div>

      {/* Sort By Options */}
      <div className="sort-by">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="fees">Fees (Low to High)</option>
          <option value="experience">Experience (High to Low)</option>
        </select>
      </div>

      {/* Display Doctor List */}
      <div className="doctor-list">
        {loading ? (
          <div>Loading...</div>
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <h2>{doctor.name}</h2>
              <p>{doctor.specialities?.map((s) => s.name).join(", ")}</p>
              <p>{doctor.fees ? `Fees: ₹${doctor.fees}` : "Fees not available"}</p>
              <p>{doctor.experience ? `Experience: ${doctor.experience} years` : "Experience not available"}</p>
            </div>
          ))
        ) : (
          <div>No doctors found</div>
        )}
      </div>
    </div>
  );
}

export default App;
