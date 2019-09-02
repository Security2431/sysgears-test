/* eslint-disable react/no-array-index-key */
/* eslint-disable max-classes-per-file */
import React from 'react'
import { Container } from 'react-bootstrap'
import Highway from './Highway'
import PaymentGeneticAlgorithm from './PaymentGeneticAlgorithm'
import PrintBestGenes from './PrintBestGenes'
import PrintHighway from './PrintHighway'

const POPULATION_SIZE = 100
const MUTATION_RATE = 0.2

const Solution = () => {
  const highway = new Highway()
  const pga = new PaymentGeneticAlgorithm(POPULATION_SIZE, MUTATION_RATE)
  const result = []

  do {
    pga.сreateNewGeneration(highway.payments)
    result.push(
      <>
        <p>
          {Array(80)
            .fill('-')
            .join('')}
        </p>
        <p>Трасса</p>
        <PrintHighway highway={highway} />
        <p>Платежи</p>
        <PrintBestGenes payments={pga.bestPayments} />

        <p>{`Поколение: ${pga.generation}, Переплата: ${pga.bestOverpayment}`}</p>
      </>,
    )
    if (pga.generation > 1000) break
  } while (pga.bestOverpayment > highway.minOverpayment)

  return (
    <section>
      <Container>
        <p>==Программа планирования платежей==</p>
        <br />
        <p>Текущая ситуация на трассе</p>
        <PrintHighway highway={highway} />
        <p>Платежи</p>
        <PrintBestGenes payments={pga.bestPayments} />
        {result}
      </Container>
    </section>
  )
}

export default Solution
