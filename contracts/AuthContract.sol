// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10 ;


contract Users {

    struct User{
        uint256 userId;
        string username;
        string password;
        string mnemonicPhrase;
    }
    mapping(string => User) UserDataBase;
    mapping(string => bool) UserExixts;
    uint256 private userCount = 0;

    function addNewUser(string memory username, string memory password, string memory mnemonicPhrase) public{
        userCount++;
        User memory newUser = User(userCount, username, password, mnemonicPhrase);
        UserDataBase[username] = newUser;
        UserExixts[username] = true;
    }

    function isUserAlreadyRegistered(string memory username) public view returns (bool){
        return UserExixts[username];
    }

    function loginRegisteredUser(string memory username, string memory password) public view returns(bool){
        require (UserExixts[username] == true, "User is not Registered");
        if(keccak256(abi.encodePacked(UserDataBase[username].username)) == keccak256(abi.encodePacked(username)) && keccak256(abi.encodePacked(UserDataBase[username].password)) == keccak256(abi.encodePacked(password))){
            return true;
        }
        return false;
    }

    function verifyUserWithMnemonicPhrase(string memory mnemonicPhrase, string memory username) public view returns(bool){
        require (UserExixts[username] == true, "User is not Registered");
        if(keccak256(abi.encodePacked(UserDataBase[username].mnemonicPhrase)) == keccak256(abi.encodePacked(mnemonicPhrase))){
            return true;
        }
        return false;
    }

    function resetUserPassword(string memory username, string memory newPassword) public returns(string memory){
        UserDataBase[username].password = newPassword;
        return "Password reset successful.";
    }
}