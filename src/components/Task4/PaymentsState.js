/* eslint-disable prefer-spread */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
import DNA from './DNA'

class PaymentsState {
  overpayment = 0

  constructor(init = 'forOffspring') {
    this.payments = []
    this.overpayment = 0

    if (init === 'forHighway') {
      this.setPaymentsForHighway()
    } else if (init === 'forDriver') {
      this.setPaymentsForDriver()
    }
  }

  // случайное целое от min до max включительно
  randomInteger = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1)
    return Math.round(rand)
  }

  // генирируем массив из десяти чисел от 1 до 10 рассположенных в случ.порядке
  getRandomValues = () => {
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5)
    const arr = Array(10)
      .fill(0)
      .map((_, index) => index + 1)

    return shuffle(arr)
  }

  // Заполнение списка оплат для Водителя
  // все типы монет 1..10 предствлены в отдном экземпляре
  // в случайном порядке
  setPaymentsForDriver = () => {
    this.payments = this.getRandomValues().map((val) => new DNA(val, false))
  }

  // Создание списка оплат для Автострады
  setPaymentsForHighway = () => {
    // сгенирируем массив из десяти чисел от 1 до 10 рассположенных в случ.порядке
    const values = this.getRandomValues()

    // скорректируем под требование суммы
    let sum = 0
    while (sum <= 55) {
      const index = this.randomInteger(0, 8)
      // просто копируем соседний элемент
      values[index] = values[index + 1]
      sum = values.reduce((cur, val) => cur + val, 0)
    }

    // заполняем список
    this.payments = values.map((val) => new DNA(val, false))
  }

  calcOverpayment = (highwayPayments) => {
    if (highwayPayments.length === 0) return 0

    for (let i = 0; i < highwayPayments.length; i++) {
      // если это ранее уже зафиксированный ген,
      // то пропускаем его
      if (this.payments[i].locked) continue

      const val = highwayPayments[i].value - this.payments[i].value
      // в случае равенства (самая выгодная оплата)
      if (val === 0) {
        this.payments[i].locked = true // фиксируем эту ДНК
      } else if (val < 0) {
        // В случае, если ее номинал выше, чем стоимость проезда,
        // водитель сдачу не получает и остаток сгорает.
        this.overpayment += Math.abs(val)
      } else {
        // в случае полож.остатка он идет в долг, т.е. все равно в переплату
        this.overpayment += val
      }
    }

    return this.overpayment
  }

  // Скрещивание с другим геном и получение потомка
  crossover = (secondParent) => {
    if (!secondParent) {
      return
    }

    // Здесь сложное наследование, т.к. каждая
    // монета должна быть представлена единожды и обязательно
    // т.е. если берем от мамы в позиции 1 монету 10,
    // то у папы мы уже не можем взять монету с этим же достоинством 10

    // словарь для хранения использованных достоинств монет
    const usedCoins = Array.apply(null, Array(10)).map(() => false)
    // теперь у потомка должны быть гены от обоих родителей
    // зафиксированные гены должны занять те же самые позиции и значение
    // незафиксированные гены должны взять значение из словаря достоинств монет
    const offspringPayments = Array.apply(null, Array(10)).map(() => new DNA(0, false))
    // определим у мамы(this) зафиксированные ДНК,
    // т.е. те, кот. не следует изменять
    const motherLockedDNAs = this.payments.filter(({ locked }) => locked === true)

    // пробежимся по ним и включим их в словарь использованных монет
    // и добавим их в список для потомка
    motherLockedDNAs.forEach((locked) => {
      const index = this.payments.indexOf(locked)
      offspringPayments[index] = locked

      // отмечаем использование монеты
      usedCoins[locked.value - 1] = true
    })

    // определим у папы(secondParent) тоже
    const fatherLockedDNAs = secondParent.payments.filter((payment) => payment.locked === true)
    fatherLockedDNAs.forEach((locked) => {
      // определим индекс который занимает
      const index = secondParent.payments.indexOf(locked)

      // если у матери такой монеты не было,
      // и этот индекс еще свободен
      if (!usedCoins[locked.value - 1] && offspringPayments[index].value === 0) {
        offspringPayments[index] = locked
        usedCoins[locked.value - 1] = true
      }
    })

    // теперь нужно заполнить оставшиеся гены
    offspringPayments.forEach((payment) => {
      if (payment.value === 0) {
        let val = 0
        for (const i in usedCoins) {
          if (usedCoins[i] === false) {
            val = parseInt(i, 10) + 1
            break
          }
        }
        // eslint-disable-next-line no-param-reassign
        payment.value = val
        usedCoins[val - 1] = true
      }
    })

    // готовим потомока
    const offspring = new PaymentsState('forOffspring')
    offspringPayments.forEach((payment) => {
      offspring.payments.push(payment)
    })

    // eslint-disable-next-line consistent-return
    return offspring
  }

  // Мутирование гена
  mutate = (mutationRate) => {
    // Сложное мутирование, т.к. каждое достоинстово монеты
    // должно быть обязательно и один раз

    for (let i = 0; i < this.payments.length; i++) {
      // если это ранее уже зафиксированный ген,
      // то пропускаем его
      if (this.payments[i].locked) continue

      if (Math.random() < mutationRate) {
        // запоминаем монету
        const coinInner = this.payments[i].value
        // новое случайное значение монеты
        const coinRandomValue = this.randomInteger(1, 10)

        // находим ген монеты с таким же значением
        const dna = this.payments.filter((payment) => payment.value === coinRandomValue).shift()

        // если этот ген имеет статус зафиксированного
        // то ничего с ним делать не будем
        if (dna.locked) continue

        // находим индекс этого гена
        const index = this.payments.indexOf(dna)

        // запоминаем по этому индексу новый ген
        this.payments[index] = new DNA(coinInner)
        // а по текущему индексу полученную из случайного знач.
        this.payments[i] = dna
      }
    }
  }
}

export default PaymentsState
