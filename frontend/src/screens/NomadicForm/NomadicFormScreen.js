import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import PowerUsageScreen from "./pieces/PowerUsageScreen";

const NomadicForm = () => {
  const nomadicForm = useSelector((state) => state.nomadicForm);

  const [hasAnswer, setHasAnswer] = useState(null);

  const handleSubmit = () => {
    setHasAnswer(nomadicForm);
    console.log("Form response ", nomadicForm);
  };

  return (
    <div>
      <h1>Nomadic Energy Form</h1>
      <PowerUsageScreen />
      <div>
        <h3>Charging & solar</h3>
        <div></div>
      </div>
      <div>
        <h3>System monitoring</h3>
      </div>
      <Button type="submit" variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {hasAnswer && hasAnswer.vanlifeFrequency && (
        <div style={{ paddingTop: 20 }}>
          <div style={{ fontSize: 20 }}>Answers</div>
          <div>Watts: {hasAnswer.totalWattage}</div>
          <div>Inverter: {hasAnswer.inverterNeeded}</div>
          <div>Vanlife frequency: {hasAnswer.vanlifeFrequency}</div>
          <div>Vanlife time: {hasAnswer.vanlifeTime}</div>
          <div>Vanlife usage: {hasAnswer.vanlifeUsage}</div>
        </div>
      )}
    </div>
  );
};

export default NomadicForm;
