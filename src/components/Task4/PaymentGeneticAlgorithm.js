import PaymentsState from './PaymentsState'

class PaymentGeneticAlgorithm {
  generation = 0

  tmpNewPopulation = []

  population = []

  mutationRate = null

  bestPaymentsState

  constructor(populationSize, mutationRate = 0.5) {
    this.mutationRate = mutationRate
    this.population = Array(populationSize).fill(new PaymentsState('forDriver'))

    // в первый раз у нас лучшим будет просто первый
    // eslint-disable-next-line prefer-destructuring
    this.bestPaymentsState = this.population[0]
  }

  get bestOverpayment() {
    return this.bestPaymentsState.overpayment // значение лучшей переплаты
  }

  get bestPayments() {
    return this.bestPaymentsState.payments // лучшие оплаты
  }

  // Создание нового поколения популяции
  сreateNewGeneration = (highwayPayments) => {
    // проверка входных данных
    if (!highwayPayments) return
    if (highwayPayments.length <= 0) return
    if (this.population.length <= 0) return

    // выбор из популяции наиболее пригодного экземпляра
    this.bestPaymentsState = this.сalculateFitness(highwayPayments)

    // готовим новую популяцию
    this.tmpNewPopulation = []

    // будем скрещивать лучшего с оставшемися в популяции
    this.population.forEach((_, index) => {
      // выбор родителя
      const parent = this.population[index]
      // производим наследование или скрещивание
      const child = this.bestPaymentsState.crossover(parent)
      // подвергнем потомка мутации
      child.mutate(this.mutationRate)
      // вносим потомка в новую коллекцию
      this.tmpNewPopulation.push(child)
    })

    // заменяем старую популяцию на новую
    const tmpList = Object.assign(this.population)
    this.population = Object.assign(this.tmpNewPopulation)
    this.tmpNewPopulation = tmpList
    // увеличиваем счетчик поколений
    this.generation += 1
  }

  // Проверка текущего поколения на пригодность
  // Выявление лучшего гена наиболее подходящего под образец
  сalculateFitness = (highwayPayments) => {
    let best = this.bestPaymentsState
    highwayPayments.forEach((_, index) => {
      const fitness = this.population[index].calcOverpayment(highwayPayments)
      // если переплата меньше, берем этот вариант
      if (fitness < best.overpayment) {
        best = this.population[index]
      }
    })

    return best
  }
}

export default PaymentGeneticAlgorithm
