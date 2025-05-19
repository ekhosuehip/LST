import crypto from 'crypto';

class EncryptLib {
  private algorithm = 'aes-256-cbc';
  private keyLength = 32;

  encrypt(text: string, key: string): string {
    const iv = crypto.randomBytes(16);
    const ivHex = iv.toString('hex');
    const derivedKey = crypto.scryptSync(key, ivHex, this.keyLength);

    const cipher = crypto.createCipheriv(this.algorithm, derivedKey, iv);
    const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

    return `${ivHex}:${encrypted}`;
  }

  decrypt(encrypted: string, key: string): string {
    const [ivHex, encryptedText] = encrypted.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const derivedKey = crypto.scryptSync(key, ivHex, this.keyLength);

    const decipher = crypto.createDecipheriv(this.algorithm, derivedKey, iv);
    const decrypted = decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');

    return decrypted;
  }
}

const encryptLib = new EncryptLib();

export default encryptLib
