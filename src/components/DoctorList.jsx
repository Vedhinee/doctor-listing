const DoctorList = ({ doctors }) => {
    if (!doctors.length) return <p>No doctors found.</p>;
  
    return (
      <div>
        {doctors.map((doc, index) => (
          <div
            key={doc.id || index}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            <h3>{doc.name}</h3>
            <p>Specialty: {doc.specialty}</p>
            <p>Experience: {doc.experience} years</p>
            <p>Fees: ₹{doc.fees}</p>
            <p>Consultation: {doc.consultationType}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default DoctorList;
  