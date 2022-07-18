import {
  ADD_APPLIANCE,
  REMOVE_APPLIANCE,
  ADD_OTHER_APPLIANCES,
  INVERTER_NEEDED,
  AVERAGE_POWER_NEEDED,
  TOTAL_WATTAGE,
  SET_VANLIFE_TIME,
  SET_VANLIFE_FREQUENCY,
  SET_VANLIFE_USAGE,
} from "../constants/nomadicFormConstants";

export const nomadicFormReducer = (
  state = {
    appliancesList: [],
    totalWattage: 0,
    otherAppliances: null,
    inverterNeeded: false,
    averagePowerNeeded: 0,
    vanlifeTime: null,
    vanlifeFrequency: null,
    vanlifeUsage: null,
  },
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
      };
    case ADD_OTHER_APPLIANCES:
      return {
        ...state,
        otherAppliances: action.payload,
      };
    case INVERTER_NEEDED:
      return { ...state, inverterNeeded: !state.inverterNeeded };
    case AVERAGE_POWER_NEEDED:
      return { ...state, averagePowerNeeded: state.averagePowerNeeded + action.payload };
    case SET_VANLIFE_TIME:
      return { ...state, vanlifeTime: action.payload };
    case SET_VANLIFE_FREQUENCY:
      return { ...state, vanlifeFrequency: action.payload };
    case SET_VANLIFE_USAGE:
      return { ...state, vanlifeUsage: action.payload };
    default:
      return state;
  }
};
