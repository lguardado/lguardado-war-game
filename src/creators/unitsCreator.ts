import { UnitTypesEnum } from "../constants/armyConstants";
import { Archer, Knight, MilitaryUnit, Soldier } from "../models/units";

export function unitsCreator(type: string, quantity: number): Array<MilitaryUnit> {
  let arr = new Array<MilitaryUnit>(quantity);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = unitCreator(type);
  }
  return arr;
}

export function unitCreator(type: string): MilitaryUnit {
  switch (type) {
    case UnitTypesEnum.archer:
      return new Archer();
    case UnitTypesEnum.soldier:
      return new Soldier();
    case UnitTypesEnum.knight:
      return new Knight();
    default:
      break;
  }
}