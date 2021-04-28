const combat = require('./combat')

const start = state => {
  while (
    state.teams
      .map(team => team.reduce(
        (acc, character) => acc + character.health.value,
        0
      ))
      .filter(totalHealth => totalHealth > 0)
      .length > 1
  ) {

    console.log("----- Turn", state.turn)

    state.teams.forEach((team, teamIndex) => team.forEach(character => {
      if (character.health.value <= 0) {
        return
      }
      const skill = character.skills[state.turn % character.skills.length]

      if (!skill.auraCost) {
        skill.cast(combat, character, state.teams[(teamIndex + 1) % state.teams.length].find(character => character.health.value > 0), skill)
      }

      if (skill.auraCost && character.aura.value >= skill.auraCost) {
        skill.cast(combat, character, state.teams[(teamIndex + 1) % state.teams.length].find(character => character.health.value > 0), skill)
        character.aura.value -= skill.auraCost
      }

      if (character.effects) {
        character.effects = character.effects.map(effect => ({ ...effect, turns: effect.turns - 1 }))
        character.effects = character.effects.filter(effect => effect.turns > 0)
      } 
    }))

    state.turn += 1

  }
}

module.exports = {
  start,
}
