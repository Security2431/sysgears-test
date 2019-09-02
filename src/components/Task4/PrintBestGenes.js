/* eslint-disable react/prop-types */
import React from 'react'

const PrintBestGenes = ({ payments }) => {
  const names = [...Array(payments.length)].map((val, i) => String.fromCharCode(i + 65))
  const result = payments.map((payment, index) => `[${names[index]}:${payment.value}]===`).join('')

  return <p>{`|=====${result}==|`}</p>
}

export default PrintBestGenes
