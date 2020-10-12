import * as civilizationConstants from "../constants/civilizationConstants";
import { Army } from "./army";

export interface ICivilizationValues {
  soldiersQuantity: number;
  archersQuantity: number;
  knightsQuantity: number;
}

export class Civilization {
  type: string;
  armyComposition: ICivilizationValues;
  armies: Array<Army> = [];
  addArmy(army: Army) {
    this.armies.push(army);
  }
}

export class ChineseCivilization extends Civilization {
  type = civilizationConstants.ChineseValues.type;
}

export class EnglishCivilization extends Civilization {
  type = civilizationConstants.EnglishValues.type;
}

export class ByzantineCivilization extends Civilization {
  type = civilizationConstants.ByzantineValues.type;
}
