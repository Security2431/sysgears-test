export const setInput = (inputs, setInputs) => {
  const { name, value, isValid = true } = inputs

  const nextInput = {
    [name]: {
      value,
      isValid,
    },
  }

  setInputs((prevInputs) => ({ ...prevInputs, ...nextInput }))
}

export const setTemperature = (name, inputValue, setInputs) => {
  const value = Math.ceil(inputValue)

  setInput({ name, value }, setInputs)
}

export const validateInput = ({ value }) => {
  const input = Number(value)
  if (Number.isNaN(input)) {
    return false
  }

  return true
}

export const setTemperatures = (inputs, setInputs) => {
  const isValid = validateInput(inputs)

  if (!isValid) {
    setInput({ ...inputs, isValid }, setInputs)
    return
  }

  const temperature = Number(inputs.value)
  const nextInputs = {
    ...inputs,
    isValid,
    value: temperature,
  }

  // Set trigered temperature
  setInput(nextInputs, setInputs)

  switch (inputs.name) {
    case 'celcius':
      setTemperature('fahrenheit', (temperature * 9) / 5 + 32, setInputs)
      setTemperature('kelvin', temperature + 273.15, setInputs)
      break
    case 'fahrenheit':
      setTemperature('celcius', ((temperature - 32) * 5) / 9, setInputs)
      setTemperature('kelvin', ((temperature - 32) * 5) / 9 + 273.15, setInputs)
      break
    case 'kelvin':
      setTemperature('fahrenheit', ((temperature - 273.15) * 9) / 5 + 32, setInputs)
      setTemperature('celcius', temperature - 273.15, setInputs)
      break
    default:
      break
  }
}

export const getFirstUpperChar = (char) => char.charAt(0).toUpperCase()

export const getTemperaturesJSON = (name, inputs) => {
  if (!name) {
    return null
  }

  const newState = { ...inputs }
  delete newState[name]

  const json = Object.fromEntries(
    Object.entries(newState).map(([key, val]) => {
      const newKey = getFirstUpperChar(key)
      // if not Kelvin temperature, return value with notation key
      const newValue = newKey !== 'K' ? val.value + newKey : val.value

      return [newKey, newValue]
    }),
  )

  return JSON.stringify(json, null, 2) // spacing level = 2
}
