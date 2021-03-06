import * as civilizationConstants from "../constants/civilizationConstants";
import { AdvancedArmy } from "./army";

export interface ICivilizationValues {
  soldiersQuantity: number;
  archersQuantity: number;
  knightsQuantity: number;
}

export class Civilization {
  type: string;
  armyComposition: ICivilizationValues;
  armies: Array<AdvancedArmy> = [];
  addArmy(army: AdvancedArmy) {
    this.armies.push(army);
  }
  getType() {
    return this.type;
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
