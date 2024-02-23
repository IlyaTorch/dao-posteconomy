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

        users.push(User(max, 0xD87Fea2184D952eEEf827A190Fba9D7F2F09A638));
        users.push(User(tony, 0x012493BE86AC0107723b1e1A0aCc087A42236ccA));
        users.push(User(alex, 0x3D30c9631Fce0B4ebF71CcFAaa2e93597949A448));
        users.push(User(felix, 0x6620bcaCC17760eE0C81b1F440e8801EF8e65aEF));
        users.push(User(nastya, 0x68Bca109B3B6959cbc504B3cd07a81f11a9285Ec));
    }

    function getUsers() public view returns (User[] memory) {
        return users;
    }
}