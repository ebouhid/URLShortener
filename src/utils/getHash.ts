/* 
 * For the sake of simplicity, we'll use a simple hash generator. This does not guarantee
 * uniqueness, nor does it avoid collisions, but it's good enough for our purposes.
 */

// Generate a random integer between 0 and max
const randomInt = (max: number) => Math.floor(Math.random() * max);

// Convert a base-10 integer to base a base-62 string
const toBase62 = (num: number) => {
  const base = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = "";
  while (num > 0) {
    str = base[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str;
};

// Generate a random base-62 string
// Based on the storage requirement estimation, we'll need up to 365 billion hashes
export const generateHash = () => {
  const max = 365 * 1000 * 1000 * 1000;
  const num = randomInt(max);
  return toBase62(num);
};
