const CONTRACT_ADDRESS = "0x4140391db6d713e3276f46cc1e519b4066a56e22";

const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "password",
        type: "string",
      },
      {
        internalType: "string",
        name: "mnemonicPhrase",
        type: "string",
      },
    ],
    name: "addNewUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    name: "isUserAlreadyRegistered",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "password",
        type: "string",
      },
    ],
    name: "loginRegisteredUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "mnemonicPhrase",
        type: "string",
      },
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
    ],
    name: "verifyUserWithMnemonicPhrase",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "username",
        type: "string",
      },
      {
        internalType: "string",
        name: "newPassword",
        type: "string",
      },
    ],
    name: "resetUserPassword",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
module.exports = {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
};
