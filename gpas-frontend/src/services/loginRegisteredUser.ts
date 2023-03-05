/** 
  * @param {string} username
  * @param {string} password
  * @param {object} contract
  * @param {function} setLoader
  * @returns {object} resultObj
  * @returns {string} resultObj.message
  * @returns {boolean} resultObj.status
  * @returns {boolean} resultObj.result
  * @description Logins a registered user
*/

export const loginRegisteredUser = async (
  username: string,
  password: string,
  contract: any,
  setLoader: (value: boolean) => void
) => {
  try {
    setLoader(true);
    contract.methods
      .loginRegisteredUser(username, password)
      .call(async (err: any, result: any) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(result);
          const resultObj = {
            message: result[0],
            result: result[1],
            status: result[2],
          };
          return resultObj;
        }
      });
  } catch (err: any) {
    console.log(err.message);
    const resultObj = {
      message: err.message,
      result: null,
      status: false,
    };
    return resultObj;
  } finally {
    setLoader(false);
  }
};
