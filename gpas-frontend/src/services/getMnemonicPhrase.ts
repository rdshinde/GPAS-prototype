/**
 * @param {string} username
 * @param {string} walletAddress
 * @param {string} privateKey
 * @returns {object} resultObj
 * @returns {string} resultObj.message
 * @returns {boolean} resultObj.status
 * @returns {string} resultObj.result
 */

export const getMnemonicPhrase = async (
  username: string,
  contract: any,
  setLoader: (value: boolean) => void
) => {
  try {
    setLoader(true);
    contract.methods
      .getMnemonicPhrase(username)
      .call(async (err: any, result: any) => {
        if (err) {
          console.log(err.message);
        } else {
          const resultObj = {
            message: result[0],
            status: result[1],
            result: result[2],
          };
          console.log("mnemonicPhrase", resultObj);
          return resultObj;
        }
      });
  } catch (err: any) {
    console.log(err.message);
  } finally {
    setLoader(false);
  }
};
