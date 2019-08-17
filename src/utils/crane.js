export const getMoves = (slabs) => {
  const moves = []
  const loadingCrane = (n, a = 'a', b = 'b', c = 'c') => {
    if (n <= 0) {
      return
    }

    loadingCrane(n - 1, a, c, b)
    moves.push(`#${n} slot_${a} -> slot_${b}`)
    loadingCrane(n - 1, c, b, a)
  }

  loadingCrane(slabs)
  return moves
}

export const validateInput = (value) => {
  const input = Number.parseInt(value, 10)
  if ((Number.isNaN(input) && input) || input > 8 || input < 3) {
    return false
  }

  return true
}
