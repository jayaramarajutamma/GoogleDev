import React, { useState } from 'react';
import PlantLifeCycle from './PlantLifeCycle';
import Images from './Images';
import './MainComponent.css';

const MainComponent = () => {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState("");

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));

      // Here you can integrate your image recognition API to get the disease output
      setOutput("Plant Disease: Pests detected! (Dummy output)"); // Replace with actual API output
    }
  };

  return (
    <div className="main-content">

      {/* First Part - Quote about Farming */}
      <div className="quote-section">
        <h2>Farming is the foundation of human civilization.</h2>
        <p>"Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happiness." - Thomas Jefferson</p>
      </div>
      <PlantLifeCycle/>
      <Images/>
      </div>
      
  );
};

export default MainComponent;
