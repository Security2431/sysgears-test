import React from 'react'
import { Container } from 'react-bootstrap'

import Navigation from '../Navigation'
import { getTemperaturesJSON, setTemperatures } from '../../utils/temperature'

const initState = {
  celcius: {
    value: '',
    isValid: true,
  },
  fahrenheit: {
    value: '',
    isValid: true,
  },
  kelvin: {
    value: '',
    isValid: true,
  },
}

const useInputs = () => {
  const [inputs, setInputs] = React.useState(initState)
  const [inputName, setInputName] = React.useState()

  const handleInputChange = (event) => {
    event.persist()

    const { name, value } = event.target
    setInputName(name)

    setTemperatures({ name, value }, setInputs)
  }

  const json = getTemperaturesJSON(inputName, inputs)

  return {
    inputs,
    handleInputChange,
    json,
  }
}

const invalidInputStyles = {
  borderColor: 'red',
  color: 'red',
}

const Task1 = () => {
  const { inputs, handleInputChange, json } = useInputs()
  const { celcius, fahrenheit, kelvin } = inputs

  return (
    <>
      <Navigation />
      <section>
        <Container>
          <h1>Task 1</h1>
          <details>
            <summary>
              <i>Задача:</i>
            </summary>
            <p>
              Создать приложение по переводу значения температуры между градусами цельсия,
              фаренгейта и кельвина.
            </p>
            <i>Входящие параметры:</i>
            <p>
              Значение температуры вместе с указанием шкалы (цельсий, фаренгейт или кельвин),
              например: 26С, 299K, или 79F.
            </p>
            <i>Выходные данные:</i>
            <p>
              {
                'Целые значения температур в JSON формате для всех шкал измерения, кроме указанной во входящих параметрах, например: {"K": "299", "F": "79F"}'
              }
            </p>
          </details>
        </Container>
      </section>
      <section>
        <Container>
          <fieldset>
            <legend>Scale Celcius</legend>
            <input
              style={!celcius.isValid ? invalidInputStyles : {}}
              name="celcius"
              value={celcius.value}
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset>
            <legend>Scale Fahrenheit</legend>
            <input
              style={!fahrenheit.isValid ? invalidInputStyles : {}}
              name="fahrenheit"
              value={fahrenheit.value}
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset>
            <legend>Scale Kelvin</legend>
            <input
              style={!kelvin.isValid ? invalidInputStyles : {}}
              name="kelvin"
              value={kelvin.value}
              onChange={handleInputChange}
            />
          </fieldset>
          <br />
          <output>{json}</output>
        </Container>
      </section>
    </>
  )
}

export default Task1
