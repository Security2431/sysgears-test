import React from 'react'
import { Container } from 'react-bootstrap'

import Form from '../Form'
import Context from '../Context'
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

const Solution = () => {
  const { inputs, handleInputChange, json } = useInputs()
  const { temperature } = React.useContext(Context)

  const data = temperature.map((input) => ({
    ...input,
    values: {
      ...input.values,
      ...inputs[input.values.name],
    },
  }))

  return (
    <section>
      <Container>
        <Form inputs={data} handleInputChange={handleInputChange} output={json} />
      </Container>
    </section>
  )
}

export default Solution
