import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ADD_APPLIANCE, REMOVE_APPLIANCE, TOTAL_WATTAGE } from "../../../constants/nomadicFormConstants";
import checkboxesPowerUsage from "../../../nomadicData/data/nomadicAppliances";

const PowerUsageScreen = () => {
  const nomadicForm = useSelector((state) => state.nomadicForm);
  const { appliancesList, inverterNeeded } = nomadicForm;
  console.log("appliancesList ? ", appliancesList);
  const dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState({});
  const [newAppliance, setNewAppliance] = useState({ name: "", watts: "", voltage: false });
  const [newApplianceRadio, setNewApplianceRadio] = useState({ label: "1", value: 12 });
  const newApplianceVoltageRadios = [
    { name: "12V", label: "1", value: 12 },
    { name: "230V", label: "2", value: 230 },
  ];

  useEffect(() => {
    console.log("appliances ", appliancesList);
    dispatch({ type: TOTAL_WATTAGE });
  }, [appliancesList, dispatch]);

  const handleChange = (event) => {
    const appliance = checkboxesPowerUsage.find((x) => x.name === event.target.name);

    event.target.checked
      ? dispatch({
          type: ADD_APPLIANCE,
          payload: {
            name: event.target.name,
            watts: appliance.watts,
            voltage: appliance.voltage,
          },
        })
      : dispatch({ type: REMOVE_APPLIANCE, payload: event.target.name });
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const Checkbox = ({ type = "checkbox", name, checked = false, onChange, value }) => {
    return <input type={type} name={name} checked={checked} onChange={onChange} value={value} />;
  };

  const handleAddAppliance = () => {
    dispatch({
      type: ADD_APPLIANCE,
      payload: {
        name: newAppliance.name,
        watts: parseInt(newAppliance.watts),
        voltage: parseInt(newApplianceRadio.value),
        newAppliance: true,
      },
    });
    setNewAppliance({ name: "", watts: "", voltage: false });
  };

  const handleRemoveAppliance = (applianceName) => {
    dispatch({
      type: REMOVE_APPLIANCE,
      payload: applianceName,
    });
  };
  return (
    <div>
      <h3>Power usage</h3>
      <div>
        <div>
          Please tick all of the products you will use in your campervan or overlander. IMPORTANT: if you choose high
          wattage 230V products, this will directly impact the cost and specification of your system. The higher the
          total wattage, the more expensive the system becomes.* The list is divided into 12V and 230V products. Please
          note that if you pick any 230V products, this will mean you need an inverter.
          <i>some image</i>
        </div>
        <div>
          <ul>
            {checkboxesPowerUsage.map((item) => (
              <div>
                <label key={item.key}>
                  <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} /> {item.label}
                </label>
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div>
          Do you have any other appliances not detailed on the previous list? If yes, please detail these below and
          include the wattage of the product (this can usually be found if you google it, on the product specification)
          and whether it is 12V or 230V.
        </div>
        <div>
          <input
            type="text"
            name="otherApplianceName"
            onChange={(evt) => setNewAppliance({ ...newAppliance, name: evt.target.value })}
            value={newAppliance.name}
          />
          <input
            type="number"
            name="otherApplianceWattage"
            onChange={(evt) => setNewAppliance({ ...newAppliance, watts: evt.target.value })}
            value={newAppliance.watts}
          />
          {" W "}
          <ButtonGroup>
            {newApplianceVoltageRadios.map((radio) => (
              <ToggleButton
                key={radio.label}
                id={radio.label}
                type="radio"
                variant={radio.label % 2 ? "outline-success" : "outline-danger"}
                name="radio"
                value={radio.value}
                checked={newApplianceRadio.label === radio.label}
                onChange={(e) => setNewApplianceRadio({ label: e.currentTarget.id, value: e.currentTarget.value })}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <Button type="submit" variant="secundary" onClick={handleAddAppliance}>
            Add
          </Button>
        </div>
        <div>
          {nomadicForm.appliancesList.map((x) => {
            if (x.newAppliance) {
              return (
                <div>
                  {x.name}
                  <Button type="submit" variant="danger" onClick={() => handleRemoveAppliance(x.name)}>
                    Remove
                  </Button>
                </div>
              );
            }
          })}
        </div>
        {inverterNeeded && <div style={{ color: "red" }}>You'll need an inverter</div>}
      </div>
    </div>
  );
};

export default PowerUsageScreen;

// Lights - 12V (~12W)
// Phone charger - 12V (~10W)
// iPad or tablet charger - 12V (~20W)
// Fridge - 12V (~48W)
// Water pump - 12V (~15W)
// Fan (e.g. MaxxAir Maxxfan) - 12V (~60W)
// Diesel/gas powered heater/boiler (electric ignition) - 12V (~40W)
// Truma Combi 4e - electric (~15W)
// WiFi router / dongle - 12V (~2.5W)
// Laptop charger - 230V (~60W)
// Radio - 230V (~50W)
// Blender - 230V (~500W)
// Toaster - 230V (~700W)
// Hairdryer - 230V (~1600W)
// Hair straighteners - 230V (~200W)
// TV - 230V (~120W)
// LCD monitor - 230V (~14W)
// Games console - 230V (~200W)
// Handheld games console - 230V (~40W)
// Domestic kettle - 230V (~3000W)
// Low wattage "caravan kettle" - 230V (~1200W)
// Projector - 230V (~45W)
// Speaker - 230V (~10W)
// Camera charger - 230V (~3W)
// Drone charger - 230V (~20W)
// Electric induction hob - 230V (~1800W)
