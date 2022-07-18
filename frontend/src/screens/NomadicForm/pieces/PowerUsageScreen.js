import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Form, Image, ToggleButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_APPLIANCE,
  REMOVE_APPLIANCE,
  TOTAL_WATTAGE,
  SET_VANLIFE_TIME,
  SET_VANLIFE_FREQUENCY,
  SET_VANLIFE_USAGE,
} from "../../../constants/nomadicFormConstants";
import checkboxesPowerUsage from "../../../nomadicData/data/nomadicAppliances";
import { vanlifeTimeData, vanlifeFrequencyData, vanlifeTypicalUsageData } from "../../../nomadicData/data/vanlifeTime";
import Imagem1 from "../../../nomadicData/images/Imagem1.png";

const styleClasses = {
  questionContainer: { padding: 15 },
};

const PowerUsageScreen = () => {
  const nomadicForm = useSelector((state) => state.nomadicForm);
  const { appliancesList, inverterNeeded } = nomadicForm;
  const dispatch = useDispatch();

  const [checkedItems, setCheckedItems] = useState({});
  const [newAppliance, setNewAppliance] = useState({ name: "", watts: "", voltage: false });
  const [newApplianceRadio, setNewApplianceRadio] = useState({ label: "1", value: 12 });
  const newApplianceVoltageRadios = [
    { name: "12V", label: "1", value: 12 },
    { name: "230V", label: "2", value: 230 },
  ];

  useEffect(() => {
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
    console.log("new appliance ", newAppliance);
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
      <div style={styleClasses.questionContainer}>
        <div>
          <h5>
            Please tick all of the products you will use in your campervan or overlander. IMPORTANT: if you choose high
            wattage 230V products, this will directly impact the cost and specification of your system. The higher the
            total wattage, the more expensive the system becomes.
          </h5>
          <h6>
            * The list is divided into 12V and 230V products. Please note that if you pick any 230V products, this will
            mean you need an inverter.
          </h6>
          <Image src={Imagem1} fluid rounded />
        </div>
        <div>
          <ul>
            {checkboxesPowerUsage.map((item) => {
              // console.log(item.key, item);
              return (
                <div key={item.key}>
                  <label key={item.key}>
                    <Checkbox name={item.name} checked={checkedItems[item.name]} onChange={handleChange} /> {item.label}
                  </label>
                </div>
              );
            })}
          </ul>
        </div>
      </div>

      <div style={styleClasses.questionContainer}>
        <h5>
          Do you have any other appliances not detailed on the previous list? If yes, please detail these below and
          include the wattage of the product (this can usually be found if you google it, on the product specification)
          and whether it is 12V or 230V.
        </h5>
        <div>
          <input
            type="text"
            name="otherApplianceName"
            placeholder="Appliance name"
            onChange={(evt) => setNewAppliance({ ...newAppliance, name: evt.target.value })}
            value={newAppliance.name}
          />
          <input
            type="number"
            name="otherApplianceWattage"
            placeholder="Wattage"
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
            return (
              x.newAppliance && (
                <div key={`${x.name}-new`}>
                  {x.name}
                  <Button type="submit" variant="danger" onClick={() => handleRemoveAppliance(x.name)}>
                    Remove
                  </Button>
                </div>
              )
            );
          })}
        </div>
        {inverterNeeded && (
          <div style={{ fontSize: 20, color: "red", paddingBottom: 15 }}>You'll need an inverter!</div>
        )}
      </div>

      <div style={styleClasses.questionContainer}>
        <div>
          <h5>How long do you plan to keep your campervan or overlander for?</h5>
          <h6>* This influences the type of battery we will recommend for you.</h6>
        </div>
        <div>
          <Form>
            <div className="mb-3">
              {vanlifeTimeData.map((item) => {
                return (
                  <Form.Check
                    key={`${item.label}-time`}
                    label={`${item.label} years`}
                    name="group-1"
                    type="radio"
                    id={item.key}
                    onChange={() => dispatch({ type: SET_VANLIFE_TIME, payload: item.label })}
                  />
                );
              })}
            </div>
          </Form>
        </div>
      </div>

      <div style={styleClasses.questionContainer}>
        <div>
          <h5>How often will you use your campervan or overlander?</h5>
          <h6>
            * This influences the size of battery we will recommend for you. Pick whichever option most closely matches
            your usage.
          </h6>
        </div>
        <div>
          <Form>
            <div className="mb-3">
              {vanlifeFrequencyData.map((item) => {
                return (
                  <Form.Check
                    key={item.key}
                    label={item.label}
                    name="group-2"
                    type="radio"
                    id={item.key}
                    onChange={() => dispatch({ type: SET_VANLIFE_FREQUENCY, payload: item.label })}
                  />
                );
              })}
            </div>
          </Form>
        </div>
      </div>

      <div style={styleClasses.questionContainer}>
        <div>
          <h5>Which statement best describes your typical usage?</h5>
          <h6>
            * Please note: including shore hook up in your system will increase your total cost, as it requires a
            MultiPlus which is an inverter and a battery charger in one. This also has a knock on effect to associated
            components.
          </h6>
        </div>
        <div>
          <Form>
            <div className="mb-3">
              {vanlifeTypicalUsageData.map((item) => {
                return (
                  <Form.Check
                    key={item.key}
                    label={item.label}
                    name="group-3"
                    type="radio"
                    id={item.key}
                    onChange={() => dispatch({ type: SET_VANLIFE_USAGE, payload: item.label })}
                  />
                );
              })}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default PowerUsageScreen;
