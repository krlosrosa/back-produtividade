export interface Validator {
  isValid: (input: unknown) => ReturnValidatorType
}

export type ReturnValidatorType = {
  isValid: boolean
  error?: Error
}
