import { startSession } from "mongoose";
import {
  ADD_APPLIANCE,
  REMOVE_APPLIANCE,
  ADD_OTHER_APPLIANCES,
  INVERTER_NEEDED,
  AVERAGE_POWER_NEEDED,
  TOTAL_WATTAGE,
} from "../constants/nomadicFormConstants";

export const nomadicFormReducer = (
  state = { appliancesList: [], totalWattage: 0, otherAppliances: null, inverterNeeded: false, averagePowerNeeded: 0 },
  action
) => {
  switch (action.type) {
    case ADD_APPLIANCE:
      return {
        ...state,
        appliancesList: [...state.appliancesList, action.payload],
      };
    case REMOVE_APPLIANCE:
      return {
        ...state,
        appliancesList: state.appliancesList.filter((x) => x.name !== action.payload),
      };
    case TOTAL_WATTAGE:
      let findInverterNeed = false;
      const calcWattage = state.appliancesList.reduce((accumulator, appliance) => {
        if (appliance.voltage > 12) {
          findInverterNeed = true;
        }
        return accumulator + appliance.watts;
      }, 0);
      return {
        ...state,
        totalWattage: calcWattage,
        inverterNeeded: findInverterNeed,
        // totalWattage: state.appliancesList.forEach((x) => {
        //   console.log("X ", x, state.totalWattage);
        //   return x.watts + state.totalWattage;
        // }),
      };
    case ADD_OTHER_APPLIANCES:
      const content = action.payload;

      console.log("content ", content);
      const wattage = content;
      const name = "0";
      return {
        ...state,
        otherAppliances: action.payload,
      };
    case INVERTER_NEEDED:
      return { ...state, inverterNeeded: !state.inverterNeeded };
    case AVERAGE_POWER_NEEDED:
      return { ...state, averagePowerNeeded: state.averagePowerNeeded + action.payload };
    default:
      return state;
  }
};
