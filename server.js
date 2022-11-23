const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./blockchain-node-api/routes");
const Web3 = require("web3");

const contract = require("@truffle/contract");
const artifacts = require("./build/contracts/Users.json");
const CONTRACT_ABI = require("./blockchain-node-api/config");
const CONTRACT_ADDRESS = require("./blockchain-node-api/config");
const PORT = process.env.PORT;
const { connectDB } = require("./db/db.connect");

app.use(cors());
app.use(express.json());

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

(async function start() {
  connectDB();

  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  const User = new web3.eth.Contract(
    CONTRACT_ABI.CONTRACT_ABI,
    CONTRACT_ADDRESS.CONTRACT_ADDRESS
  );

  routes(app, accounts, User);
})();

// connectDB();

// const accounts = await web3.eth.getAccounts();
// console.log(accounts);
// const User = new web3.eth.Contract(
//   CONTRACT_ABI.CONTRACT_ABI,
//   CONTRACT_ADDRESS.CONTRACT_ADDRESS
// );

// routes(app, db, accounts, User);

app.get("/", (req, res) => {
  res.json({ Name: "GPAS Prototype" });
});

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found on server, please check",
  });
});

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "error occured, see the errMessage key for more details",
    errorMessage: err.message,
  });
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
