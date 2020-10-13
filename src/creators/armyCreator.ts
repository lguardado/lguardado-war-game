import { AdvancedArmy, ByzantineArmy, ChineseArmy, EnglishArmy } from "../models/army";
import { CivilizationTypesEnum } from "../constants/civilizationConstants";

export function advancedArmyCreator(type: string): AdvancedArmy {
  switch (type) {
    case CivilizationTypesEnum.chinese:
      return new ChineseArmy();

    case CivilizationTypesEnum.english:
      return new EnglishArmy();

    case CivilizationTypesEnum.byzantine:
      return new ByzantineArmy();
  }
}
