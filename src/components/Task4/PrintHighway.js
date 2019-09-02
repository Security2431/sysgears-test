/* eslint-disable react/prop-types */
import React from 'react'

const PrintHighway = ({ highway }) => {
  const { payments } = highway
  const names = [...Array(payments.length)].map((val, i) => String.fromCharCode(i + 65))
  const result = payments.map((payment, index) => `[${names[index]}:${payment.value}]===`).join('')

  return (
    <>
      <p>{`Общая сумма оплаты: ${highway.paymentSum}, минимально возможная переплата: ${highway.minOverpayment}`}</p>
      <p>{`|=====${result}==|`}</p>
    </>
  )
}

export default PrintHighway
