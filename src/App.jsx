import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import DoctorList from "./components/DoctorList";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    consultationType: "",
    specialties: [],
    sortBy: "",
  });

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setDoctors(res.data);
      setFilteredDoctors(res.data);
    });
  }, []);

  useEffect(() => {
    let result = [...doctors];

    console.log("Filters:", filters);
    console.log("Search Query:", searchQuery);

    if (searchQuery) {
      result = result.filter((doc) =>
        doc.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.consultationType) {
      result = result.filter(
        (doc) =>
          doc.consultationType?.toLowerCase() ===
          filters.consultationType.toLowerCase()
      );
    }

    if (filters.specialties.length) {
      result = result.filter((doc) =>
        filters.specialties.includes(doc.specialty)
      );
    }

    if (filters.sortBy === "fees") {
      result.sort((a, b) => a.fees - b.fees);
    } else if (filters.sortBy === "experience") {
      result.sort((a, b) => b.experience - a.experience);
    } else if (filters.sortBy === "specialty") {
      result.sort((a, b) => a.specialty.localeCompare(b.specialty));
    }

    console.log("Filtered Doctors:", result);
    setFilteredDoctors(result);
  }, [searchQuery, filters, doctors]);

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Doctor Listing</h1>
      <SearchBar setSearchQuery={setSearchQuery} doctors={doctors} />
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        doctors={doctors}
      />
      <DoctorList doctors={filteredDoctors} />
    </div>
  );
}

export default App;
