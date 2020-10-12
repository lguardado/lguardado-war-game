import { CivilizationTypesEnum } from "../constants/civilizationConstants";
import { ByzantineCivilization, ChineseCivilization, EnglishCivilization } from "../models/civilization";

export function civilizationCreator(type: string) {
  switch (type) {
    case CivilizationTypesEnum.chinese:
      return new ChineseCivilization();

    case CivilizationTypesEnum.english:
      return new EnglishCivilization();

    case CivilizationTypesEnum.byzantine:
      return new ByzantineCivilization();
  }
}