import PaymentsState from './PaymentsState'

class Highway {
  payments = []

  paymentSum = 0

  minOverpayment = null

  paymentsState

  constructor() {
    this.paymentsState = new PaymentsState('forHighway')
    this.payments = this.paymentsState.payments
    this.paymentSum = this.payments.reduce((total, val) => total + val.value, 0)
    this.minOverpayment = this.paymentSum - 55
  }
}

export default Highway
