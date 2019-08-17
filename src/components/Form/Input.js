import React from 'react'
import PropTypes from 'prop-types'

const invalidInputStyles = {
  borderColor: 'red',
  color: 'red',
}

const Input = ({ values, handleInputChange }) => {
  const { value, isValid, name } = values
  const styles = !isValid ? invalidInputStyles : {}

  return <input style={styles} name={name} value={value} onChange={handleInputChange} />
}

Input.propTypes = {
  values: PropTypes.PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isValid: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

export default Input
