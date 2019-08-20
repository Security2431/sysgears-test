/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container } from 'react-bootstrap'

import Form from '../Form'
import Context from '../Context'
import { validateInput, getBestOutcomes, getParseFloat } from '../../utils/archers'

const initState = {
  first: {
    value: '',
    isValid: true,
  },
  second: {
    value: '',
    isValid: true,
  },
}

const useInputs = () => {
  const [inputs, setInputs] = React.useState(initState)

  const handleInputChange = (event) => {
    event.persist()

    const { name, value } = event.target
    const isValid = validateInput(value)

    const nextInput = {
      [name]: {
        value: isValid ? getParseFloat(value) : value,
        isValid,
        name,
      },
    }

    setInputs((prevInputs) => ({ ...prevInputs, ...nextInput }))
  }

  return {
    inputs,
    handleInputChange,
  }
}

const getOutput = (data) => data.map((item) => `${item.values.name} player should shoot on ${item.step} step`)

const Solution = () => {
  const { inputs, handleInputChange } = useInputs()
  const { players } = React.useContext(Context)
  const data = players.map((input) => ({
    ...input,
    values: {
      ...input.values,
      ...inputs[input.values.name],
    },
  }))
  const bestOutcomes = getBestOutcomes(data)
  const ouput = bestOutcomes && getOutput(bestOutcomes)

  return (
    <section>
      <Container>
        <Form inputs={data} handleInputChange={handleInputChange} output={ouput} />
      </Container>
    </section>
  )
}

export default Solution
