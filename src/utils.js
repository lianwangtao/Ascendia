// @flow

import { VALID_EMAIL_REGEX } from './constants'

export function isValidEmail(email: string): boolean {
  return email.match(VALID_EMAIL_REGEX) !== null
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}
