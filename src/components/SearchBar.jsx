const SearchBar = ({ setSearchQuery }) => {
    return (
      <input
        type="text"
        placeholder="Search doctor by name..."
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: "8px", width: "100%", marginBottom: "1rem" }}
      />
    );
  };
  
  export default SearchBar;