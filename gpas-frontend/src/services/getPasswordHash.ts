import crypto from "crypto";

/**
 * @param {object} passwordData - The password data to hash
 * @param {string} username - The username of the user
 * @returns {string} The hashed password
 * @description This function hashes the password data and returns the hash
 **/

export const getPasswordHash = (passwordData: any, username: string) => {
  const hash = crypto.createHash("sha256");
  for (const obj of passwordData) {
    if (Object.keys(obj).length > 0) {
      hash.update(JSON.stringify(obj));
    } else {
      hash.update(username);
    }
  }
  return hash.digest("hex");
};
