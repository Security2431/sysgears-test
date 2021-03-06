import React from 'react'
import { Container } from 'react-bootstrap'

import Navigation from '../Navigation'
import Solution from './Solution'

const Task1 = () => (
  <>
    <Navigation />
    <section>
      <Container>
        <h1>Task 1</h1>
        <details>
          <summary>
            <i>Задача:</i>
          </summary>
          <p>
            Создать приложение по переводу значения температуры между градусами цельсия, фаренгейта
            и кельвина.
          </p>
          <i>Входящие параметры:</i>
          <p>
            Значение температуры вместе с указанием шкалы (цельсий, фаренгейт или кельвин),
            например: 26С, 299K, или 79F.
          </p>
          <i>Выходные данные:</i>
          <p>
            {
              'Целые значения температур в JSON формате для всех шкал измерения, кроме указанной во входящих параметрах, например: {"K": "299", "F": "79F"}'
            }
          </p>
        </details>
      </Container>
    </section>
    <Solution />
  </>
)

export default Task1
