import { Battle } from "../arena";
import { UnitTypesEnum } from "../constants/armyConstants";
import { ByzantineValues, ChineseValues, EnglishValues, INITIAL_GOLD } from "../constants/civilizationConstants";
import { unitsCreator } from "../creators/unitsCreator";
import { Archer, Knight } from "./units";
import { CivilizationTypesEnum } from '../constants/civilizationConstants';

export interface IArmy {
  type: string;
  gold: number;
  units: any[];
  battlesHistory: string[];
  getPoints: () => number;
  getHistory: () => string[];
  getCivilization: () => string;
  addBattleToHistory: (val: string) => void;
  receiveGold: (amount: number) => void;
  spendGold: (amount: number) => void;
  // en un caso real se usaria un ID para entrenar/actualizar unidades
  trainUnit: (type: string) => void;
  upgradeUnit: (type: string) => void;
  attack: (to: IArmy) => void;
  removeLastUnit: () => void;
}

export class Army implements IArmy {
  type: string;
  gold: number = INITIAL_GOLD;
  units: Array<any>;
  battlesHistory: Array<string> = [];
  addBattleToHistory(battle: string) {
    this.battlesHistory.push(battle);
  };
  receiveGold(gold: number) {
    this.gold += gold;
  };
  spendGold(gold: number) {
    this.gold -= gold;
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
        `${
          this.type
        } ${oldUnit.getType()} upgraded to ${newType.getType()}!`
      );
    }
  };
  attack(to: Army) {
    Battle(this, to);
  };
  removeLastUnit() {
    this.units.pop();
  }
};

export class ChineseArmy extends Army {
  type = CivilizationTypesEnum.chinese
  units = [
    ...unitsCreator(UnitTypesEnum.soldier, ChineseValues.soldiersQuantity),
    ...unitsCreator(UnitTypesEnum.archer, ChineseValues.archersQuantity),
    ...unitsCreator(UnitTypesEnum.knight, ChineseValues.knightsQuantity)
  ];
}

export class ByzantineArmy extends Army {
  type = CivilizationTypesEnum.byzantine
  units = [
    ...unitsCreator(UnitTypesEnum.soldier, ByzantineValues.soldiersQuantity),
    ...unitsCreator(UnitTypesEnum.archer, ByzantineValues.archersQuantity),
    ...unitsCreator(UnitTypesEnum.knight, ByzantineValues.knightsQuantity)
  ];
}
export class EnglishArmy extends Army {
  type = CivilizationTypesEnum.english
  units = [
    ...unitsCreator(UnitTypesEnum.soldier, EnglishValues.soldiersQuantity),
    ...unitsCreator(UnitTypesEnum.archer, EnglishValues.archersQuantity),
    ...unitsCreator(UnitTypesEnum.knight, EnglishValues.knightsQuantity)
  ];
}