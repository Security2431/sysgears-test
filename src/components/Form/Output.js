import React from 'react'
import PropTypes from 'prop-types'

const Output = ({ children }) => <output>{children}</output>

Output.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default Output
