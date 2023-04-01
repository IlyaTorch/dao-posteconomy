// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract PosteconomyDAO {
    struct DAO {
        address[] members;
        string name;
    }

    DAO[] public daos;

    event DAOCreated(uint256 indexed daoId, string name);
    event DAOJoined(uint256 indexed daoId, address member);

    function createDAO(string memory _name) public {
        address[] memory members;
        daos.push(DAO(members, _name));
        emit DAOCreated(daos.length - 1, _name);
    }

    function joinDAO(uint256 _daoId) public {
        require(_daoId < daos.length, "DAO does not exist");
        require(!isMember(_daoId, msg.sender), "Already a member of DAO");
        daos[_daoId].members.push(msg.sender);
        emit DAOJoined(_daoId, msg.sender);
    }

    function isMember(uint256 _daoId, address _member) public view returns (bool) {
        for (uint256 i = 0; i < daos[_daoId].members.length; i++) {
            if (daos[_daoId].members[i] == _member) {
                return true;
            }
        }
        return false;
    }

    function getDAOsCount() public view returns (uint256) {
        return daos.length;
    }

    function getDAO(uint256 _daoId) public view returns (address[] memory, string memory) {
        require(_daoId < daos.length, "DAO does not exist");
        return (daos[_daoId].members, daos[_daoId].name);
    }

    function getAllDAOs() public view returns (string[] memory) {
        string[] memory daoNames = new string[](daos.length);
        for (uint256 i = 0; i < daos.length; i++) {
            daoNames[i] = daos[i].name;
        }
        return daoNames;
    }

}
