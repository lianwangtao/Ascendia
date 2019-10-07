// @flow

export function log(str: string): void {
  const isProduction: boolean = process.env.NODE_ENV === 'production'
  if (!isProduction) {
    console.log(str)
  }
}

export const LoginErrorMessage = {
  INVALID_EMAIL: 'Invalid email',
  INVALID_PASSWORD: 'Invalid password',
}
