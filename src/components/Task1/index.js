import React from 'react'
import { Container } from 'react-bootstrap'

import Navigation from '../Navigation'

class Task1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scale: 'c',
      temp: 0,
    }
  }

  handleCelcius = (e) => {
    this.setState({
      scale: 'c',
      temp: e.target.value,
    })
  }

  handleFahrenheit = (e) => {
    this.setState({
      scale: 'f',
      temp: e.target.value,
    })
  }

  handleKelvin = (e) => {
    this.setState({
      scale: 'k',
      temp: e.target.value,
    })
  }

  render() {
    const { temp, scale } = this.state
    let celcius
    let fahrenheit
    let kelvin
    // eslint-disable
    switch (scale) {
      case 'f':
        celcius = Math.ceil(((temp - 32) * 5) / 9)
        kelvin = Math.ceil(((temp - 32) * 5) / 9 + 273.15)
        break
      case 'k':
        celcius = Math.ceil(temp - 273.15)
        fahrenheit = Math.ceil(((temp - 273.15) * 9) / 5 + 32)
        break
      case 'c':
        kelvin = Math.ceil(+temp + 273.15)
        fahrenheit = Math.ceil((temp * 9) / 5 + 32)
        break
      default:
        return temp
    }
    const data = {
      celcius,
      fahrenheit,
      kelvin,
    }
    const json = JSON.stringify(data)
    console.log(json)
    return (
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
                Создать приложение по переводу значения температуры между градусами цельсия,
                фаренгейта и кельвина.
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
        <section>
          <Container>
            <fieldset>
              <legend>Scale Celcius</legend>
              <input value={celcius} onChange={this.handleCelcius} />
            </fieldset>
            <fieldset>
              <legend>Scale Fahrenheit</legend>
              <input value={fahrenheit} onChange={this.handleFahrenheit} />
            </fieldset>
            <fieldset>
              <legend>Scale Kelvin</legend>
              <input value={kelvin} onChange={this.handleKelvin} />
            </fieldset>
          </Container>
        </section>
      </>
    )
  }
}

export default Task1
