function routes(app, accounts, User, web3) {
  app.post("/api/auth/username", async (req, res) => {
    const username = req.body.username;
    User.methods.isUserAlreadyRegistered(username).call(async (err, result) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "error occured, see the errMessage key for more details",
          errorMessage: err.message,
        });
      } else {
        const imagesGrid = [];
        for (let i = 1; i < 33; i++) {
          imagesGrid.push(
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
          );
        }
        res.status(200).json({
          success: true,
          isUserAlreadyRegistered: result,
          imagesGrid,
        });
      }
    });
  });
  app.post("/api/auth/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const mnemonicPhrase =
      "Hello this is a mnemonic phrase just for the purpose of testing.";
    User.methods
      .addNewUser(username, password, mnemonicPhrase)
      .send({ from: accounts[0], gas: "1000000" }, async (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "error occured, see the errMessage key for more details",
            errorMessage: err.message,
          });
        } else {
          console.log(result);
          res.status(201).json({
            success: true,
            message: "User created successfully",
            mnemonicPhrase,
          });
        }
      });
  });
  app.post("/api/auth/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.methods
      .loginRegisteredUser(username, password)
      .call(async (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "error occured, see the errMessage key for more details",
            errorMessage: err.message,
          });
        } else {
          console.log(result);
          res.status(200).json({
            success: true,
            message: "User logged in successfully",
          });
        }
      });
  });
  app.post("/api/auth/phrase", async (req, res) => {
    const mnemonicPhrase = req.body.mnemonicPhrase;
    const username = req.body.username;
    User.methods
      .verifyUserWithMnemonicPhrase(mnemonicPhrase, username)
      .call(async (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "error occured, see the errMessage key for more details",
            errorMessage: err.message,
          });
        } else {
          res.status(200).json({
            success: true,
            isUserVerified: result,
          });
        }
      });
  });

  app.post("/api/auth/reset", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.methods
      .resetUserPassword(username, password)
      .send({ from: accounts[0], gas: "1000000" }, async (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "error occured, see the errMessage key for more details",
            errorMessage: err.message,
          });
        } else {
          console.log(result);
          res.status(200).json({
            success: true,
            message: "Password reset successfully",
          });
        }
      });
  });
}
module.exports = routes;
