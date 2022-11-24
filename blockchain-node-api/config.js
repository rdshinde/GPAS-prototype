const CONTACT_ADDRESS = "0x4B3C257045d71789a8290e584460909F08C29489";

const CONTACT_ABI = [
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
  CONTACT_ABI,
  CONTACT_ADDRESS,
};
