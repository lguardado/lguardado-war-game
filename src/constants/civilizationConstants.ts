export enum CivilizationTypesEnum {
  chinese = "Chinese",
  english = "English",
  byzantine = "Byzantine"
}

export const INITIAL_GOLD = 1000;

export const ChineseValues = {
  type: CivilizationTypesEnum.chinese,
  soldiersQuantity: 2,
  archersQuantity: 25,
  knightsQuantity: 2
};
export const ByzantineValues = {
  type: CivilizationTypesEnum.byzantine,
  soldiersQuantity: 2,
  archersQuantity: 25,
  knightsQuantity: 2
};
export const EnglishValues = {
  type: CivilizationTypesEnum.english,
  soldiersQuantity: 5,
  archersQuantity: 8,
  knightsQuantity: 15
};
