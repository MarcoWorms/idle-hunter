module.exports = {
  name: 'Unnamed Character',
  alignment: 'Enhancer',

  health: {
    value: 100,
    max: 100,
    regen: 1,
  },

  aura: {
    value: 1000,
    max: 1000,
    regen: 10,
  },

  offenseRatio: 0.1,
  defenseRatio: 0.9,

  evasionRatio: 0,
  ignoreDebuffRatio: 0,

  effects: [],

  stunned: false,
  sleep: false,
  burned: false,
  poisoned: false,
  paralyzed: false,

  rates: {
    physical: 1,
    enhancement: 1,
    transmutation: 0.8,
    conjuration: 0.6,
    specialization: 0,
    manipulation: 0.6,
    emission: 0.8,
  },

  progression: {
    physical: 0,
    enhancement: 0,
    transmutation: 0,
    conjuration: 0,
    manipulation: 0,
    emission: 0,
    specialization: 0,
  },

  skills: [
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
  ],
}
