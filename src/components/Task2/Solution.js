/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Container } from 'react-bootstrap'

import InputGroup from '../Form/InputGroup'

const getMoves = (slabs) => {
  const moves = []
  const loadingCrane = (n, a = 'a', b = 'b', c = 'c') => {
    if (n <= 0) {
      return
    }

    loadingCrane(n - 1, a, c, b)
    moves.push(`#${n} slot_${a} -> slot_${b}`)
    loadingCrane(n - 1, c, b, a)
  }

  loadingCrane(slabs)
  return moves
}

const validateInput = (value) => {
  const input = Number.parseInt(value, 10)
  if ((Number.isNaN(input) && input) || input > 8 || input < 3) {
    return false
  }

  return true
}

const initState = {
  value: '',
  isValid: true,
  name: 'slabs',
}

const useInputs = () => {
  const [values, setValues] = React.useState(initState)
  const [moves, setMoves] = React.useState([])

  const handleInputChange = (event) => {
    event.persist()

    const { name, value } = event.target
    const isValid = validateInput(value)

    const nextInput = {
      value,
      isValid,
      name,
    }

    setValues((prevInputs) => ({ ...prevInputs, ...nextInput }))

    if (!isValid) {
      setMoves([])
      return
    }

    setMoves(getMoves(value))
  }

  return {
    moves,
    values,
    handleInputChange,
  }
}

const Solution = () => {
  const { moves, values, handleInputChange } = useInputs()

  return (
    <section>
      <Container>
        <InputGroup
          title="Enter slabs value between 3 and 8"
          handleInputChange={handleInputChange}
          values={values}
        />
        <ul>
          {moves.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export default Solution
