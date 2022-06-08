export const useConvertToHuman = (value: string, decimals: string): number => {
  return parseInt(value) / 10 ** parseInt(decimals)
}

export const convertToHuman = (value: string, decimals: string): number => {
  return parseInt(value) / 10 ** parseInt(decimals)
}
