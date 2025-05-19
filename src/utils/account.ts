import crypto from 'crypto';

export const generateNumber = (userId: object, phoneNumber: string, salt: string, length: number): string => {
  const data = `${userId}:${phoneNumber}:${salt}`;

  // Initial hash
  let hash = crypto.createHash('sha256').update(data).digest('hex');

  // Extract digits only
  let digits = hash.replace(/\D/g, '');

  // If not enough digits, rehash until we have enough
  while (digits.length < 16) {
    hash = crypto.createHash('sha256').update(hash).digest('hex');
    digits += hash.replace(/\D/g, '');
  }

  // Return the first `length` digits
  return digits.slice(0, length);
};

export default generateNumber;
