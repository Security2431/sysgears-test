/* eslint-disable react/no-array-index-key */
/* eslint-disable max-classes-per-file */
import React from 'react'
import { Container } from 'react-bootstrap'

class DNA {
  value = null

  locked = null

  constructor({ value, locked = false }) {
    this.value = Number(value)
    this.locked = Boolean(locked)
  }

  getDNAString = () => (
    `${this.value}->${this.locked}`
  )
}

class PaymentsState {
  overpayment = 0

  payments = []

  // constructor
  constructor(init = 'forOffspring') {
    this.payments = new Array(10)
    if (init === 'forHighway') {
      this.getPaymentsForHighway()
    } else if (init === 'forDriver') {
      this.getPaymentsForDriver()
    }
  }

  sortArray = (elements) => elements.sort((a, b) => a - b)

  shuffleArray = (elements) => (elements.sort(() => 0.5 - Math.random()))

  generateArray = (counts) => (new Array(counts).fill(0).map((_, index) => index + 1))

  getShuffledArray = (elements) => {
    // Starts from 1
    const generatedArray = this.generateArray(elements)

    return this.shuffleArray(generatedArray)
  }

  getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  // <summary>
  // Заполнение списка оплат для Водителя
  // все типы монет 1..10 предствлены в отдном экземпляре
  // в случайном порядке
  // </summary>
  getPaymentsForDriver = () => {
    const values = this.getShuffledArray(10)

    // заполняем список
    this.payments = values.map((value) => new DNA({ value, locked: false }))
  }

  // <summary>
  // Создание списка оплат для Автострады
  // </summary>
  // <returns></returns>
  getPaymentsForHighway = () => {
    // сгенирируем массив из десяти чисел от 1 до 10 рассположенных в случ.порядке
    // let values = this.getShuffledArray(10)
    // let summ = 0
    // let times = 0

    // // скорректируем под требование суммы
    // do {
    //   const index = this.getRandomNum(0, 8)
    //   values[index] = values[index + 1]
    //   summ = values.reduce((sum, current) => sum + current, 0)

    //   times += 1
    //   if (times > 100) {
    //     times = 0
    //     values = this.getShuffledArray(10)
    //   }
    // } while (summ <= 55)

    const values = [7, 8, 9, 9, 10, 6, 2, 4, 5, 1]

    // заполняем список
    this.payments = values.map((value) => (new DNA({ value, locked: false })))
  }

  // <summary>
  // Подсчет переплаты на основании переданного списка оплат
  // </summary>
  // <param name="paymentPoints">список оплат у автотрассы</param>
  // <returns>значение переплаты</returns>
  calcOverpayment = (highwayPayments) => {
    if (!highwayPayments) { console.error('highwayPayments is null') }

    highwayPayments.forEach((highwayPayment, index) => {
      // если это ранее уже зафиксированный ген,
      // то пропускаем его
      const payment = this.payments[index]
      // console.log('paymentStart', payment.locked)
      if (payment.locked) return
      const val = highwayPayment.value - payment.value
      // console.log('VAAAAAAAAAAAAAAAAAAAL', val)
      // в случае равенства (самая выгодная оплата)
      if (val === 0) {
        payment.locked = true // фиксируем эту ДНК
      } else if (val < 0) {
        // В случае, если ее номинал выше, чем стоимость проезда,
        // водитель сдачу не получает и остаток сгорает.
        this.overpayment += Math.abs(val)
        // console.log('Vaaaaal < 0', this.overpayment)
      } else { // в случае полож.остатка он идет в долг, т.е. все равно в переплату
        this.overpayment += val
        // console.log('Vaaaaal > 0', this.overpayment)
      }
      // console.log('paymentEnd', this.payments[index].locked)
    })

    return this.overpayment
  }

  // <summary>
  // Скрещивание с другим геном и получение потомка
  // </summary>
  // <param name="secondParent">другой PaymentState</param>
  // <returns></returns>
  crossover = (secondParent) => {
    if (!secondParent) { console.error('secondParent is null') }
    console.log('----------------------------crossover----------------------------------------')

    // Здесь сложное наследование, т.к. каждая
    // монета должна быть представлена единожды и обязательно
    // т.е. если берем от мамы в позиции 1 монету 10,
    // то у папы мы уже не можем взять монету с этим же достоинством 10

    // словарь для хранения использованных достоинств монет
    const usedCoins = new Array(10).fill(false)


    // теперь у потомка должны быть гены от обоих родителей
    // зафиксированные гены должны занять те же самые позиции и значение
    // незафиксированные гены должны взять значение из словаря достоинств монет
    const offspringPayments = new Array(10).fill(new DNA({ value: 0 }))

    // определим у мамы(this) зафиксированные ДНК,
    // т.е. те, кот. не следует изменять
    const motherLockedDNAs = this.payments.filter((payment) => payment.locked === true)
    // console.log('offspringPayments соси хуйца',  this.payments, motherLockedDNAs)
    // debugger

    // пробежимся по ним и включим их в словарь использованных монет
    // и добавим их в список для потомка
    motherLockedDNAs.forEach((locked) => {
      const index = this.payments.indexOf(locked)
      if (index < 0) { console.error('index not exist in motherLockedDNAs'); return }
      // console.log('пиздааааааа', offspringPayments, locked, index)

      offspringPayments[index].value = locked.value
      offspringPayments[index].locked = locked.locked

      // отмечаем использование монеты
      usedCoins[locked.value - 1] = true
    })
    // console.log('хуууууууууйэ', usedCoins, offspringPayments)
    // debugger


    // определим у папы(secondParent) тоже
    const fatherLockedDNAs = secondParent.payments.filter((payment) => payment.locked === true)

    fatherLockedDNAs.forEach((locked) => {
      // определим индекс который занимает
      const index = secondParent.payments.indexOf(locked)
      if (index < 0) { console.error('index not exist in fatherLockedDNAs'); return }

      // если у матери такой монеты не было,
      // и этот индекс еще свободен
      if (!usedCoins[locked.value - 1] && offspringPayments[index].value === 0) {
        offspringPayments[index].value = locked.value
        offspringPayments[index].locked = locked.locked
        usedCoins[locked.value - 1] = true
      }
    })

    // console.log('*//*usedCoins:before', usedCoins)
    // console.log('(.)_(.)offspringPayments:before:', offspringPayments)


    // теперь нужно заполнить оставшиеся гены
    offspringPayments.forEach((payment, index) => {
      // console.log('........................................',payment.value, payment.value === 0)
      if (payment.value === 0) {
        usedCoins[index] = true
        offspringPayments[index].value = (index + 1)
      }
    })
    console.log('*/////////////////////////////*usedCoins:after:', usedCoins)
    console.log('(.)_(.)offspringPayments:after:', offspringPayments)
    // debugger

    // готовим потомока
    const offspring = new PaymentsState()
    offspringPayments.forEach((payment, index) => {
      offspring.payments[index] = payment
    })

    return offspring
  }

  // <summary>
  // Мутирование гена
  // </summary>
  // <param name="mutationRate"></param>
  mutate = (mutationRate) => {
    // Сложное мутирование, т.к. каждое достоинстово монеты
    // должно быть обязательно и один раз

    this.payments = this.payments.map((payment) => {
      // если это ранее уже зафиксированный ген,
      // то пропускаем его
      if (payment.locked) return payment

      if (Math.random() < mutationRate) {
        // запоминаем монету
        const coinInner = payment.value
        // новое случайное значение монеты
        const coinRandomValue = this.getRandomNum(1, 10)
        // console.log(this.payments, coinRandomValue)
        // находим ген монеты с таким же значением
        const dna = this.payments.find((dnaPayment) => dnaPayment.value === coinRandomValue)
        // если этот ген имеет статус зафиксированного
        // то ничего с ним делать не будем
        if (dna.locked) return payment

        // находим индекс этого гена
        const dnaIndex = this.payments.indexOf(dna) // TODO: not for sure indexOf is working in js. Check it out plz

        // запоминаем по этому индексу новый ген
        this.payments[dnaIndex] = new DNA({ value: coinInner })
        // а по текущему индексу полученную из случайного знач.
        return dna
      }
    })
  }
}

// <summary>
// Автотрасса
// </summary>
class Highway {
  paymentsState = new PaymentsState('forHighway')

  payments = []

  paymentSum = 0

  minOverpayment = 0

  constructor() {
    this.payments = this.paymentsState.payments
    this.paymentSum = this.payments.reduce((sum, payment) => (
      sum + payment.value
    ), 0)
    this.minOverpayment = this.paymentSum - 55
  }
}

class PaymentGeneticAlgorithm {
  tmpNewPopulation = []

  bestPaymentsState // лучшая позиция

  population = []

  generation = 0 // номер поколения

  mutationRate = null // коэффициент мутации

  bestOverpayment = null

  bestPayments = []

  // constructor
  constructor(populationSize, mutationRate = 0.5) {
    this.mutationRate = mutationRate

    this.population = Array(populationSize).fill(0).map(() => new PaymentsState('forDriver'))

    // в первый раз у нас лучшим будет просто первый
    // eslint-disable-next-line prefer-destructuring
    this.bestPaymentsState = this.population[0]
    this.bestOverpayment = this.bestPaymentsState.overpayment // значение лучшей переплаты
    this.bestPayments = this.bestPaymentsState.payments.map(
      (payment) => payment.value,
    ) // лучшие оплаты
  }

  // <summary>
  // Создание нового поколения популяции
  // </summary>
  // <param name="highwayPayments"></param>
  createNewGeneration = (highwayPayments) => {
    // проверка входных данных
    if (!highwayPayments) { return }
    if (highwayPayments.length <= 0) { return }
    if (this.population.length <= 0) { return }

    // выбор из популяции наиболее пригодного экземпляра
    this.bestPaymentsState = this.calculateFitness(highwayPayments)
    console.log('this.bestPaymentsState', this.bestPaymentsState)

    // готовим новую популяцию
    this.tmpNewPopulation = []

    // console.log('GenericPopulation = ', this.population)
    console.log('GenericPopulation =========================================================================================')

    console.log('this.population', this.population)
    // будем скрещивать лучшего с оставшемися в популяции
    this.population.forEach((population, index) => {
      // выбор родителя
      const parent = population
      console.log('------------------parent', parent)
      // производим наследование или скрещивание
      const child = this.bestPaymentsState.crossover(parent)
      console.log('child', child)
      // подвергнем потомка мутации
      child.mutate(this.mutationRate)
      this.tmpNewPopulation[index] = child
    })

    // заменяем старую популяцию на новую
    const tmpList = this.population
    this.population = this.tmpNewPopulation
    this.tmpNewPopulation = tmpList
    // увеличиваем счетчик поколений
    this.generation += 1
  }

  // <summary>
  // Проверка текущего поколения на пригодность
  // Выявление лучшего гена наиболее подходящего под образец
  // </summary>
  calculateFitness = (highwayPayments) => {
    let best = this.bestPaymentsState

    // console.log('bestPaymentsState', best.overpayment)

    highwayPayments.forEach((_, index) => {
      const fitness = this.population[index].calcOverpayment(highwayPayments)
      // console.log('fitness', fitness)
      if (fitness < best.overpayment) { best = this.population[index] }
    })
    // console.log('outFintess------------------------')
    // console.log(best.overpayment)

    return best
  }
}

const printBestGenes = (bestGenes) => {
  const payments = bestGenes
  const names = [...Array(payments.length)].map((val, i) => String.fromCharCode(i + 65))

  document.write('<p>|=====')
  document.write(payments.map((payment, index) => `[${names[index]}:${payment.value}]===`).join(''))
  document.write('==|</p>')
}

const printHighway = (highway) => {
  const { payments } = highway
  const names = [...Array(payments.length)].map((val, i) => String.fromCharCode(i + 65))

  document.write(`<p>Общая сумма оплаты: ${highway.paymentSum}, минимально возможная переплата: ${highway.minOverpayment}</p>`)

  document.write('<p>|=====')
  document.write(payments.map((payment, index) => `[${names[index]}:${payment.value}]===`).join(''))
  document.write('==|</p>')
}


const Solution = () => {
  document.write('<p>==Программа планирования платежей==</p>')
  document.write('<br />')

  const populationSize = 100
  const mutationRate = 0.2

  const highway = new Highway()
  const pga = new PaymentGeneticAlgorithm(populationSize, mutationRate)

  document.write('<p>Текущая ситуация на трассе</p>')
  printHighway(highway)
  document.write('<br />')
  document.write('<p>Для начала расчета нажмите любую клавишу</p>')
  do {
    pga.createNewGeneration(highway.payments)
    document.write('<p>Трасса</p>')
    printHighway(highway)
    document.write('<p>Платежи</p>')
    printBestGenes(pga.bestPayments)
    document.write(`<p>Поколение: ${pga.generation}, Переплата: ${pga.bestOverpayment}</p>`)
    document.write(`<p>${Array(80).fill('-').join('')}</p>`)
    document.write('<br />')
    document.write('~~~~~~~~~~~~~~~~~~~~~~~')

    // console.log(pga.bestOverpayment, highway.minOverpayment)
    // console.log(pga.generation > 1000)

    if (pga.generation > 1000) break
  } while (pga.bestOverpayment > highway.minOverpayment)
  return (
    <section>
      <Container>
        text
      </Container>
    </section>
  )
}

export default Solution
