export type ResultObj = {
  message: string;
  status: boolean;
  result: boolean | null;
};

/**
 * @param {string} username
 * @param {object} contract
 * @param {function} setLoader
 * @returns {object} resultObj
 * @returns {string} resultObj.message
 * @returns {boolean} resultObj.status
 * @returns {boolean} resultObj.result
 * @description Checks if the username is already taken
 */

export const isUsernameTaken = async (
  username: string,
  contract: any,
  setLoader: (value: boolean) => void
) => {
  try {
    setLoader(true);
    contract.methods
      .isUserAlreadyRegistered(username)
      .call(async (err: any, result: any) => {
        if (err) {
          console.log(err.message);
        } else {
          const resultObj = {
            message: result[0],
            status: result[1],
            isUsernameTaken: result[2],
          };
          console.log("isUserAlreadyRegistered", resultObj);
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
