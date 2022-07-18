import React, { useState } from "react";
import { Selection, SelectionContainer } from "@madappgang/react-selections";

const LayoutScreen = () => {
  const selectionArea = {
    id: 1,
    dimensions: {
      height: 150,
      width: 300,
    },
    coordinates: {
      x: 100,
      y: 100,
    },
  };

  const [selectedArea, setSelectedArea] = useState({
    dimensions: {
      height: 50,
      width: 30,
    },
    coordinates: {
      x: 200,
      y: 500,
    },
  });

  const handleSelectionAreaUpdate = (e) => {
    console.log("here ", e);
    setSelectedArea(e);
  };

  return (
    <div>
      LayoutScreen
      <SelectionContainer>
        <Selection key={selectionArea.id} area={selectionArea} className="my-selection" />
        <Selection
          key={2}
          interactive
          style={{
            "--bg-color": "rgba(255, 255, 255, .9)",
            "--border-color": "#000",
            "--handle-color": "#3d3d3d",
          }}
          area={selectedArea}
          onAreaUpdate={(selectionArea) => handleSelectionAreaUpdate(selectionArea)}
        />
      </SelectionContainer>
    </div>
  );
};

export default LayoutScreen;
