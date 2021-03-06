import { Battle } from "../arena";
import { UnitTypesEnum } from "../constants/armyConstants";
import { ByzantineValues, ChineseValues, EnglishValues, INITIAL_GOLD } from "../constants/civilizationConstants";
import { unitsCreator } from "../creators/unitsCreator";
import { Archer, Knight, MilitaryUnit } from "./units";
import { CivilizationTypesEnum } from '../constants/civilizationConstants';

export interface IArmy {
  type: string;
  units: any[];
  battlesHistory: string[];
  getPoints: () => number;
  getHistory: () => string[];
  getCivilization: () => string;
  getUnits: () => Array<MilitaryUnit>;
  addBattleToHistory: (val: string) => void;
  removeLastUnit: () => void; 
}

interface IImprovable {
  // en un caso real se usaria un ID para entrenar/actualizar unidades
  trainUnit: (type: string) => void;
  upgradeUnit: (type: string) => void;
}

interface IPayable {
  gold: number;
  receiveGold: (amount: number) => void;
  spendGold: (amount: number) => void;
  getCurrentGold: () => number;
}

export class Army implements IArmy {
  type: string;
  units: Array<any>;
  battlesHistory: Array<string> = [];
  addBattleToHistory(battle: string) {
    this.battlesHistory.push(battle);
  };
  getHistory() {
    return this.battlesHistory;
  };
  getCivilization() {
    return this.type;
  };
  getPoints() {
    const points = this.units.reduce(
      (total, current) => total + current.getPoints(),
      0)
    return points;
  };
  getUnits() {
    return this.units;
  };
  removeLastUnit() {
    this.units.pop();
  }
};

export class AdvancedArmy extends Army implements IImprovable, IPayable {
  gold: number = INITIAL_GOLD;
  receiveGold(gold: number) {
    this.gold += gold;
  };
  spendGold(gold: number) {
    this.gold -= gold;
  };
  getCurrentGold() {
    return this.gold;
  };
   // Asumiendo acá que las unidades se entrenan de a una y
  // no importa cual unidad entrenar,
  // dado que por el momento no hay limite
  // de "nivel" y para simplifiar las cosas.
  // es decir, se entrena la primer unidad encontrada del tipo elegido.
  trainUnit(type: string) {
    let unit = this.units.find((el) => el.getType() === type);
    if (unit) {
      const cost = unit.getTrainCost();
      if (this.gold >= cost) {
        this.spendGold(cost);
        return console.log(unit.train());
      } else {
        return console.warn(`Not enough gold to train ${type} :(`);
      }
    } else {
      return console.error("Unit type not found");
    }
  };
  upgradeUnit(type: string) {
    let index = this.units.findIndex((el) => el.getType() === type);
    if (index === -1) {
      return console.error(`couldn't find any units of type ${type}`);
    }
    const oldUnit = this.units[index];
    const upgradeTo = oldUnit.upgradeTo;
    const upgradeCost = oldUnit.upgradeCost;
    let newType;
    let created = false;
    switch (upgradeTo) {
      case UnitTypesEnum.archer:
        newType = new Archer();
        created = true;
        break;
      case UnitTypesEnum.knight:
        newType = new Knight();
        created = true;
        break;
      default:
        return console.error(`unit ${type} cannot be upgraded`);
    }
    // Asumiendo que cuando se hace upgrade, se conservan los puntos previos
    // de la unidad.
    newType.addPoints(oldUnit.getPoints());
    this.spendGold(upgradeCost);
    this.units.splice(index, 1, newType);
    if (created) {
      console.log(
        `${this.type
        } ${oldUnit.getType()} upgraded to ${newType.getType()}!`
      );
    }
  };
  attack(to: AdvancedArmy) {
    Battle(this, to);
  };
}

export class ChineseArmy extends AdvancedArmy {
  type = CivilizationTypesEnum.chinese
  units = [
    ...unitsCreator(UnitTypesEnum.soldier, ChineseValues.soldiersQuantity),
    ...unitsCreator(UnitTypesEnum.archer, ChineseValues.archersQuantity),
    ...unitsCreator(UnitTypesEnum.knight, ChineseValues.knightsQuantity)
  ];
}

export class ByzantineArmy extends AdvancedArmy {
  type = CivilizationTypesEnum.byzantine
  units = [
    ...unitsCreator(UnitTypesEnum.soldier, ByzantineValues.soldiersQuantity),
    ...unitsCreator(UnitTypesEnum.archer, ByzantineValues.archersQuantity),
    ...unitsCreator(UnitTypesEnum.knight, ByzantineValues.knightsQuantity)
  ];
}
export class EnglishArmy extends AdvancedArmy {
  type = CivilizationTypesEnum.english
  units = [
    ...unitsCreator(UnitTypesEnum.soldier, EnglishValues.soldiersQuantity),
    ...unitsCreator(UnitTypesEnum.archer, EnglishValues.archersQuantity),
    ...unitsCreator(UnitTypesEnum.knight, EnglishValues.knightsQuantity)
  ];
}