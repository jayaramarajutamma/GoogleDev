import React, { useState } from "react";
import "./Images.css";
import plantData from "./PlantData";

function Images() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (plant) => {
    setSelectedPlant(plant);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlant(null);
  };

  return (
    <div className="app">
      <div className={`div-container ${showModal ? "blurred" : ""}`}>
        {plantData.map((plant) => (
          <div key={plant.id} className="inner-div" onClick={() => openModal(plant)}>
            <img src={plant.image} alt={plant.plant_name} />
            <p>{plant.plant_name}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && selectedPlant && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPlant.image} alt={selectedPlant.plant_name} className="zoomed-img" />
            <div className="info">
              <h2>{selectedPlant.plant_name}</h2>
              <h3>{selectedPlant.scientific_name}</h3>
              <h4>Disease: {selectedPlant.disease}</h4>
              <h5>Symptoms:</h5>
              <ul>
                {selectedPlant.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
              <h5>Pesticides:</h5>
              <ul>
                {selectedPlant.pesticides.map((pesticide, index) => (
                  <li key={index}>
                    {pesticide.name} - {pesticide.type} (Method: {pesticide.application_method})
                  </li>
                ))}
              </ul>
              <h5>Natural Treatment:</h5>
              <p>{selectedPlant.natural_treatment.urea_preparation}</p>
              <ul>
                {selectedPlant.natural_treatment.other_methods.map((method, index) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>
              <h5>Preventive Measures:</h5>
              <ul>
                {selectedPlant.preventive_measures.map((measure, index) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
              <h5>Recommended Crop Rotation:</h5>
              <ul>
                {selectedPlant.recommended_crop_rotation.map((rotation, index) => (
                  <li key={index}>{rotation}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Images;
