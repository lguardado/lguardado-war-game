import { armyCreator } from "./creators/armyCreator";
import { UnitTypesEnum } from "./constants/armyConstants";
import { civilizationCreator } from "./creators/civilizationCreator";
import { CivilizationTypesEnum } from "./constants/civilizationConstants";

const english = civilizationCreator(CivilizationTypesEnum.english);
english.addArmy(armyCreator(CivilizationTypesEnum.english));
const byzantine = civilizationCreator(CivilizationTypesEnum.byzantine);
byzantine.addArmy(armyCreator(CivilizationTypesEnum.byzantine));
const englishFirstInfantry = english.armies[0];
const byzantineFirstInfantry = byzantine.armies[0];

// DESCOMENTAR PARA ENTRENAR UNIDADES
// byzantineFirstInfantry.trainUnit(UnitTypesEnum.knight);
// byzantineFirstInfantry.trainUnit(UnitTypesEnum.archer);

// DESCOMENTAR PARA TESTEAR BATALLA!
// englishFirstInfantry.attack(byzantine.armies[0]);

// DESCOMENTAR PARA TESTEAR EMPATE!
// englishFirstInfantry.attack(english.armies[0]);

// DESCOMENTAR PARA TESTEAR HISTORIAL!
// console.log(englishFirstInfantry.getHistory());

// DESCOMENTAR PARA TESTEAR UPGRADE
// englishFirstInfantry.upgradeUnit(UnitTypesEnum.archer);
// englishFirstInfantry.upgradeUnit(UnitTypesEnum.soldier);

// DESCOMENTAR PARA TESTEAR UPGRADE FALLIDO
// englishFirstInfantry.upgradeUnit(UnitTypesEnum.knight);
