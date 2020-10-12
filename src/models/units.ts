import * as armyConstants from "../constants/armyConstants";

export interface IUnit {
  getTrainCost: () => number;
  getType: () => string;
  train: () => string;
  addPoints: (points: number) => void;
}

export class MilitaryUnit implements IUnit {
  protected type: string;
  protected points: number;
  protected level: number;
  trainCost: number;
  trainPoints: number;
  getTrainCost() {
    return this.trainCost;
  }
  getPoints() {
    return this.points;
  }
  getType() {
    return this.type;
  }
  train() {
    const prevLevel = this.level;
    const prevPoints = this.points;
    this.level++;
    this.addPoints(this.trainPoints);
    return `${this.type} successfully trained, lvl:${prevLevel}/ points:${prevPoints} >> lvl:${this.level}/ points:${this.points}`;
  }
  addPoints(points: number) {
    this.points += points;
  }
}

export class Soldier extends MilitaryUnit {
  type = armyConstants.UnitTypesEnum.soldier;
  level = 0;
  points = armyConstants.soldierValues.points;
  trainCost = armyConstants.soldierValues.trainCost;
  trainPoints = armyConstants.soldierValues.trainPoints;
  upgradeCost = armyConstants.soldierValues.upgradeCost;
  upgradeTo = armyConstants.soldierValues.upgradeTo;
}

export class Archer extends MilitaryUnit {
  type = armyConstants.UnitTypesEnum.archer;
  level = 0;
  points = armyConstants.archerValues.points;
  trainCost = armyConstants.archerValues.trainCost;
  trainPoints = armyConstants.archerValues.trainPoints;
  upgradeCost = armyConstants.archerValues.upgradeCost;
  upgradeTo = armyConstants.archerValues.upgradeTo;
}

export class Knight extends MilitaryUnit {
  type = armyConstants.UnitTypesEnum.knight;
  level = 0;
  points = armyConstants.knightValues.points;
  trainCost = armyConstants.knightValues.trainCost;
  trainPoints = armyConstants.knightValues.trainPoints;
}
