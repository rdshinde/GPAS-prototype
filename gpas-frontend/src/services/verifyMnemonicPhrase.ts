/**
 * @param {string} username
 * @param {string} mnemonicPhrase
 *  @param {string} walletAddress
 * @param {string} privateKey
 * @returns {object} resultObj
 * @returns {string} resultObj.message
 * @returns {boolean} resultObj.status
 * @returns {boolean} resultObj.result
 */

export const verifyMnemonicPhrase = async (
  username: string,
  mnemonicPhrase: string,
  contract: any,
  setLoader: (value: boolean) => void
) => {
  try {
    setLoader(true);
    contract.methods
      .verifyMnemonicPhrase(username, mnemonicPhrase)
      .call(async (err: any, result: any) => {
        if (err) {
          console.log(err.message);
        } else {
          const resultObj = {
            message: result[0],
            status: result[1],
            result: result[2],
          };
          return resultObj;
        }
      });
  } catch (err: any) {
    console.log(err.message);
    const resultObj = {
      message: err.message,
      status: false,
      result: null,
    };
    return resultObj;
  } finally {
    setLoader(false);
  }
};
