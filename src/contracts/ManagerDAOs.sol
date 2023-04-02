// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './DAO.sol';


contract ManagerDAOs {
    mapping(address => DAO) public daos;
    address[] daoAddresses;

    event DAOCreated(address dao, string name);
    event DAOJoined(address dao, address member);

    function createDAO(string memory _name) public {
        DAO newDAO = new DAO(_name, msg.sender);
        daos[address(newDAO)] = newDAO;
        daoAddresses.push(address(newDAO));

        emit DAOCreated(address(newDAO), _name);
    }

    function joinDAO(address _dao) public {
        DAO dao = daos[_dao];
        require(!isMember(_dao, msg.sender), "Already a member of the DAO");
        dao.addMember(msg.sender);

        emit DAOJoined(_dao, msg.sender);
    }

    function isMember(address _dao, address _member) public view returns (bool) {
        DAO dao = daos[_dao];
        for (uint256 i = 0; i < dao.membersCount(); i++) {
            if (dao.members(i) == _member) {
                return true;
            }
        }
        return false;
    }

    function getDAO(address _dao) public view returns (string memory, uint256, address[] memory) {
        DAO dao = daos[_dao];
        address[] memory daoMemers = new address[](dao.membersCount());

        for (uint256 i = 0; i < dao.membersCount(); i++) {
            daoMemers[i] = dao.members(i);
        }

        return (dao.name(), dao.membersCount(), daoMemers);
    }

    function getAllDAOs() public view returns (address[] memory) {
        return daoAddresses;
    }

}
