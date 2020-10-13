import { AdvancedArmy, Army } from "./models/army";
import { MilitaryUnit } from "./models/units";

const GOLD_WINING_PRICE = 100;

const sortTroopsMethod = (a: MilitaryUnit, b: MilitaryUnit) =>
  a.getPoints() - b.getPoints();

export function Battle(attackerArmy: AdvancedArmy, defenderArmy: AdvancedArmy) {
  const attackerArmyPoints = attackerArmy.getPoints();
  const defenderArmyPoints = defenderArmy.getPoints();

  if (attackerArmyPoints === defenderArmyPoints) {
    return processDraw(attackerArmy, defenderArmy);
  }

  let winner;
  let looser;

  if (attackerArmyPoints > defenderArmyPoints) {
    winner = attackerArmy;
    looser = defenderArmy;
  }
  if (attackerArmyPoints < defenderArmyPoints) {
    winner = defenderArmy;
    looser = attackerArmy;
  }
  return proccessBattleResults(winner, looser);
}

function processDraw(attackerArmy: AdvancedArmy, defenderArmy: AdvancedArmy) {
  attackerArmy.removeLastUnit();
  defenderArmy.removeLastUnit();
  const history = `${attackerArmy.getCivilization()} vs ${defenderArmy.getCivilization()} Draw! Both teams looses a random unit`;
  attackerArmy.addBattleToHistory(history);
  defenderArmy.addBattleToHistory(history);
  console.warn(history);
}

function proccessBattleResults(winner: AdvancedArmy, looser: AdvancedArmy) {
  if (!winner || !looser) {
    return;
  }
  const history = `${winner.getCivilization()} has defeated ${looser.getCivilization()} with ${winner.getPoints()} points vs ${looser.getPoints()} points!`;
  winner.addBattleToHistory(history);
  looser.addBattleToHistory(history);
  console.log(history);
  rewardArmy(winner);
  punishArmy(looser);
}

function rewardArmy(army: AdvancedArmy) {
  if (!army) {
    return;
  }
  army.receiveGold(GOLD_WINING_PRICE);
  console.log(`${army.getCivilization()} gets a ${GOLD_WINING_PRICE} gold reward!, 
  now they have ${army.getCurrentGold()} gold`);
}

function punishArmy(army: AdvancedArmy) {
  if (!army) {
    return;
  }
  army.getUnits().sort(sortTroopsMethod);
  army.removeLastUnit();
  army.removeLastUnit();
  console.warn(
    `${army.getCivilization()} looses 2 best units and now have ${army.getPoints()} points`
  );
}
