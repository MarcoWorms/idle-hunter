module.exports = [
  {
    name: 'Fist Attack',
    alignment: 'physical',
    minSlot: 0,
    auraCost: 50,
    damage: (caster, target, skill) => skill.auraCost + (caster.progression.physical/100),
    cast: (combat, caster, target, skill) => {
      combat.attack(caster, target, skill)
    },
  },
  {
    name: 'Enrage',
    alignment: 'enhancement',
    minSlot: 1,
    auraCost: 100,
    buff: {
      turns: 1,
      offenseRatio: 0.3,
      defenseRatio: 0.7
    },
    cast: (combat, caster, target, skill) => {
      combat.applyBuff(caster, caster, skill)
    },
  },
  {
    name: 'Enhanced Fist Attack',
    alignment: 'enhancement',
    minSlot: 2,
    auraCost: 100,
    damage: (caster, target, skill) => skill.auraCost + (caster.progression.enhancement/100),
    cast: (combat, caster, target, skill) => {
      combat.attack(caster, target, skill)
    },
  },
]

