module.exports = [
  {
    name: 'Rat',

    health: {
      value: 100,
      max: 100,
      regen: 1,
    },

    offenseRatio: 1,
    defenseRatio: 0,

    skills: [
      {
        name: 'Bite',
        alignment: 'physical',
        minSlot: 0,
        damage: (caster, target, skill) => 10,
        cast: (combat, caster, target, skill) => {
          combat.attack(caster, target, skill)
        },
      },
    ]
  }
]
