import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PowerUsageScreen from "./pieces/PowerUsageScreen";

const NomadicForm = () => {
  const nomadicForm = useSelector((state) => state.nomadicForm);

  const handleSubmit = () => {
    console.log("other things ", nomadicForm);
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
    </div>
  );
};

export default NomadicForm;
