export enum UnitTypesEnum {
  soldier = "Soldier",
  archer = "Archer",
  knight = "Knight"
}

interface IUnitValues {
  points: number;
  trainCost: number;
  readonly trainPoints: number;
  readonly upgradeCost?: number;
  readonly upgradeTo?: string;
}

export const soldierValues: IUnitValues = {
  points: 5,
  trainCost: 10,
  trainPoints: 3,
  upgradeCost: 30,
  upgradeTo: UnitTypesEnum.archer
};

export const archerValues: IUnitValues = {
  points: 10,
  trainCost: 20,
  trainPoints: 7,
  upgradeCost: 40,
  upgradeTo: UnitTypesEnum.knight
};

export const knightValues: IUnitValues = {
  points: 20,
  trainCost: 30,
  trainPoints: 10
};
