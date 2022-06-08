// @ts-nocheck
export function addCharIndex(value: number, digitsAmount = 2): string {
  const tempValue = parseFloat(value)
  // let result = +value.toFixed(digitsAmount)
  let result = tempValue.toFixed(digitsAmount)
  if (value >= 1000000000) {
    result = `${(value / 1000000000).toFixed(digitsAmount)}B`
  } else if (value >= 1000000) {
    result = `${(value / 1000000).toFixed(digitsAmount)}M`
  } else if (value >= 1000) {
    result = `${(value / 1000).toFixed(digitsAmount)}K`
  }
  return result.replace(/(\.0+|0+)$/, '')
}

export function separateThousand(value: number, digitsAmount: number): string {
  const res = []
  recFun(+value)

  function recFun(param) {
    const x = param.toString().split('.')
    if (x[0] >= 1000) {
      x[1] ? res.unshift(x[1].padEnd(3, '0')) : res.unshift('000')
      recFun(x[0] / 1000)
    } else {
      res.unshift(x[0], x[1] ? x[1].padEnd(3, '0') : '000')
      return
    }
  }

  let result = res.pop()
  result = !(result % 100) ? result / 100 : !(result % 10) ? result.slice(0, -1) : result
  // const resultString = result ? `${res.join(',')}.${result}` : `${res.join(',')}`
  // return resultString
  return result ? `${res.join(',')}.${result.slice(0, +digitsAmount)}` : `${res.join(',')}`
}
