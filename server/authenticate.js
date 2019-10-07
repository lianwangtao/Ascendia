
import bcrypt from 'bcryptjs';

// Determines how many rounds of encryption occur, 10 is standard (and default)
export const AUTH_SALT_ROUNDS: number = 10;

export default class Authentication {
  /**
   * Generates a hashed value
   * @param  {string}  value used to generate a hashed value
   * @return {Promise}
   */
  static async getHashedValue(value: ?string): Promise<string> {
    if (!value) {
      return '';
    }
    try {
      return await bcrypt.hash(value.toString(), AUTH_SALT_ROUNDS);
    } catch (error) {
      throw new Error(`[Authenticate] Error getting hashed password:${error}`);
    }
  }

  /**
   * Compares the provided id value to the hashed value.
   * @param  {string}  raw       Raw (unhashed) user id to compare with
   * @param  {string}  hash      Hashed value obtained via `getHashedValue(id)`
   * @return {Promise<boolean>}  True if values match, false otherwise.
   */
  static async doesRawMatchHash(raw: ?string, hash: ?string): Promise<boolean> {
    if (!raw || !hash) {
      return false;
    }
    try {
      return await bcrypt.compare(raw.toString(), hash.toString());
    } catch (error) {
      throw new Error('Failed getting hashed password');
    }
  }
}