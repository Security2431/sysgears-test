import React from 'react'
import PropTypes from 'prop-types'

const Output = ({ children }) => <output>{children}</output>

Output.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Output
