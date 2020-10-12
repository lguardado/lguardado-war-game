import { UnitTypesEnum } from "../constants/armyConstants";
import { Archer, Knight, Soldier } from "../models/units";

export function unitsCreator(type: string, quantity: number): Array<any> {
  let arr = new Array<any>(quantity);
  switch (type) {
    case UnitTypesEnum.archer:
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Archer();
      }
      break;
    case UnitTypesEnum.soldier:
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Soldier();
      }
      break;
    case UnitTypesEnum.knight:
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Knight();
      }
      break;
  }
  return arr;
}
