import React from 'react'
import PropTypes from 'prop-types'

import InputGroup from './InputGroup'
import Output from './Output'

const Form = ({ inputs, output, handleInputChange }) => (
  <>
    {inputs.map(({ title, values }, index) => (
      <InputGroup
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        title={title}
        values={values}
        handleInputChange={handleInputChange}
      />
    ))}
    <br />
    {output && (
      <Output>
        {Array.isArray(output)
          ? // eslint-disable-next-line react/no-array-index-key
          output.map((item, index) => <p key={`output-${index}`}>{item}</p>)
          : output}
      </Output>
    )}
  </>
)

Form.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      values: PropTypes.PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        isValid: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  output: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
}

Form.defaultProps = {
  output: null,
}

export default Form
