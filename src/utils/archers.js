export const validateInput = (value) => {
  const input = Number.parseFloat(value, 10)
  if ((Number.isNaN(input) && value !== '') || input > 0.3 || input < 0.1) {
    return false
  }

  return true
}

export const getParseFloat = (number) => Number.parseFloat(number)

export const getValue = (item) => item && item.values && item.values.value

export const lessChanceArcherIndex = (archers) => {
  const chances = archers.map((value) => getValue(value))
  const minChance = Math.min(...chances)
  const minIndex = chances.indexOf(minChance)

  return minIndex >= 0 ? minIndex : null
}

export const getBestOutcomes = (archers) => {
  const lessChanceIndex = lessChanceArcherIndex(archers)
  if (lessChanceIndex === null) {
    return null
  }
  const lessChanceArcher = archers[lessChanceIndex]
  const lessChance = getValue(lessChanceArcher)
  const restChance = 1 - lessChance
  const stepChance = restChance / 10

  let step = 0
  let chance = lessChance

  while (chance < 0.5) {
    chance += stepChance
    step += 1
  }

  return archers.map((item, index) => ({
    ...item,
    step: index === lessChanceIndex ? step : step - 1,
  }))
}
