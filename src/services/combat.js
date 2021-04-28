const R = require('ramda')

const resolveCharacterEffects = character => R.when(
  R.has("effects"),
  R.pipe(
    R.prop("effects"),
    R.map(R.omit(['turns'])),
    R.reduce(R.mergeDeepRight, character),
  ),
)(character)

const attack = (caster, target, skill) => {

  const resolvedCaster = resolveCharacterEffects(caster)
  const resolvedTarget = resolveCharacterEffects(target)

  const damage = skill.damage(resolvedCaster, resolvedTarget, skill) * resolvedCaster.offenseRatio

  const damageOnHealth = Math.round(damage * (1 - resolvedTarget.defenseRatio))
  const damageOnAura = Math.round(damage * resolvedTarget.defenseRatio)

  console.log(`ATTACK:`, caster.name, `used`, skill.name, `on`, target.name)
  resolvedTarget.health.value -= damageOnHealth
  resolvedTarget.health.value = Math.max(0, resolvedTarget.health.value)
  console.log(resolvedTarget.name, `(${resolvedTarget.health.value}/${resolvedTarget.health.max}) lost`, damageOnHealth, `health.`)

  if (resolvedTarget.aura) {
    resolvedTarget.aura.value -= damageOnAura
    resolvedTarget.aura.value = Math.max(0, resolvedTarget.aura.value)
    console.log(resolvedTarget.name, `(${resolvedTarget.aura.value}/${resolvedTarget.aura.max}) lost`, damageOnAura, `aura.`)
  }

  if (resolvedTarget.health.value <= 0) {
    console.log(`DEATH:`, resolvedTarget.name, `was killed`)
  }

}

const applyBuff = (caster, target, skill) => {
  target.effects.push({ ...skill.buff, turns: skill.buff.turns + 1 })

  console.log(`BUFF:`,target.name, `was buffed with`, skill.name)
}

const applyDebuff = (caster, target, skill) => {

  console.log('DEBUFF:', caster.name, 'used', skill.name, 'on', target.name)

  if (target.ignoreDebuffRatio && Math.random() < target.ignoreDebuffRatio) {
    console.log(target.name, 'has ignored the debuff')
    return
  }

  target.effects.push({ ...skill.debuff, turns: skill.debuff.turns + 1 })
  console.log(target.name, 'was debuffed with', skill.name)
}


const removeEffects = caster => {
  caster.effects =  []
}


const passTurnOnCharacterEffects = character => ({
  ...character,
  effects: character.effects
      .map(e => ({
        ...e,
        turns: e.turns - 1,
      }))
      .filter(e => e.turns > 0)
})

module.exports = {
  attack,
  applyBuff,
  applyDebuff,
  removeEffects,
  passTurnOnCharacterEffects,
}

