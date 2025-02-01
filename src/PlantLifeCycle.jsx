import React, { useState } from "react";
import plantsData from "./plantsData";
import "./PlantLifeCycle.css";

const PlantLifeCycle = () => {
  const [selectedPlant, setSelectedPlant] = useState("all");
  const [hoveredPlant, setHoveredPlant] = useState(null); // Track hovered plant

  const filteredPlants = selectedPlant === "all" 
    ? plantsData 
    : plantsData.filter(plant => plant.name === selectedPlant);

  const handleMouseEnter = (plantName) => {
    setHoveredPlant(plantName); // Set the hovered plant's name to identify the plant
  };

  const handleMouseLeave = () => {
    setHoveredPlant(null); // Reset when hover is removed
  };

  return (
    <div className="plant-lifecycle-container">
      <div className="plant-filter">
        <select 
          value={selectedPlant} 
          onChange={(e) => setSelectedPlant(e.target.value)}
          className="plant-dropdown"
        >
          <option value="all">All Plants</option>
          {plantsData.map(plant => (
            <option key={plant.name} value={plant.name}>
              {plant.name}
            </option>
          ))}
        </select>
      </div>

      <div className="plant-container">
        {filteredPlants.map((plant) => (
          <div 
            key={plant.name} 
            className="plant-card" 
            onMouseEnter={() => handleMouseEnter(plant.name)} 
            onMouseLeave={handleMouseLeave}
          >
            <h3>{plant.name}</h3>

            {plant.videoUrl && hoveredPlant === plant.name && (
              <div className="video-container">
                <iframe
                  width="560"
                  height="315"
                  src={`${plant.videoUrl}?autoplay=1`} // Enable autoplay for the specific hovered video
                  title={`${plant.name} Life Cycle Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            <div className="plant-details">
              <h4>Life Cycle:</h4>
              <ul>
                {plant.lifeCycle.map((stage, index) => (
                  <li key={index}>{stage}</li>
                ))}
              </ul>
              <h4>Planting Instructions:</h4>
              <ul>
                {plant.plantingInstructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
              <h4>Care Tips:</h4>
              <ul>
                {plant.careTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
              <p>
                <strong>Watering Precautions:</strong> {plant.wateringPrecautions}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantLifeCycle;
