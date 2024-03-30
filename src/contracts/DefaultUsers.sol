pragma solidity ^0.8.0;

contract DefaultUsers {
    struct User {
        string username;
        address userAddress;
    }

    User[] public users;

    constructor() {
        string memory max = "Maxim Zamir";
        string memory tony = "Anton Cheplukov";
        string memory alex = "Aliaksandr Askerka";
        string memory felix = "Felix Lipov";
        string memory nastya = "Anastasiya Konoplina";

        users.push(User(max, 0xEb6D42757C77B1c0809E87e3C6Aa95ff0DD7dED8));
        users.push(User(tony, 0x12455B362556fC60e29Dc841Cad9C6c6Db7de264));
        users.push(User(alex, 0x00462eB5089A88c01210AF95d41971863b9Bc122));
        users.push(User(felix, 0x11a6CFB065a8819329C6c0d9Eddc96a4558CEFE6));
        users.push(User(nastya, 0x91362EE7F4aeeE3D3B20568E553028a5E20e7385));
    }

    function getUsers() public view returns (User[] memory) {
        return users;
    }
}