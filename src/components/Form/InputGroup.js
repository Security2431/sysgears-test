import React from 'react'
import PropTypes from 'prop-types'

import Input from './Input'

const InputGroup = ({ title, values, handleInputChange }) => (
  <fieldset>
    {title && <legend>{title}</legend>}
    <Input values={values} handleInputChange={handleInputChange} />
  </fieldset>
)

InputGroup.propTypes = {
  title: PropTypes.string,
  values: PropTypes.PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isValid: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
}

InputGroup.defaultProps = {
  title: null,
}

export default InputGroup
