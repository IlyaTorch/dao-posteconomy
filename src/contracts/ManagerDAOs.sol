// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './DAO.sol';


contract ManagerDAOs {
    mapping(address => DAO) public daos;
    address[] daoAddresses;

    event DAOCreated(address dao, string name);
    event DAOJoined(address dao, address member);

    function createDAO(string memory _name, string memory _description) public {
        DAO newDAO = new DAO(_name, _description, msg.sender);
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

    function addDefaultMembersToDAO(address _dao) public {
        DAO dao = daos[_dao];
        address[10] memory accounts = [
            0xdA50C3AA3F935B3FC1830f476e2c245b5f45e64B,
            0x017F648856D2aD665c6eBB577E8bff9c29ad7351,
            0x591c472ff1c891A3C79dF047266C41e7DC8dD307,
            0xf4221d5C37F470939801ef4A3BaA9F4d460A042B,
            0xBbb205Ecf75829F13b6109189Ee1861cc38e63F1,
            0x1F3bDf7C4756892C7F03D15a875b8af5069045Fd,
            0x23D049c5886089F9f7746217D745B41d3F939A7b,
            0x07c3B02D1A22D9fE02750EB2d6A1f0Be677C151D,
            0x7add452E82f9eA945eBaAc8f8F32168cba9f14D8,
            0x82a9F8F87568ebA3aD798E61E693b35cbc8c4FE1
        ];
        for (uint256 i = 0; i < 10; i++) {
            address _account = accounts[i];
            if (!isMember(_dao, _account)) {
                dao.addMember(_account);
                emit DAOJoined(_dao, _account);
            }
        }
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

    function getDAO(address _dao) public view returns (string memory, string memory, uint256, address[] memory) {
        DAO dao = daos[_dao];
        address[] memory daoMemers = new address[](dao.membersCount());

        for (uint256 i = 0; i < dao.membersCount(); i++) {
            daoMemers[i] = dao.members(i);
        }

        return (dao.name(), dao.description(), dao.membersCount(), daoMemers);
    }

    function getAllDAOs() public view returns (address[] memory) {
        return daoAddresses;
    }

}
