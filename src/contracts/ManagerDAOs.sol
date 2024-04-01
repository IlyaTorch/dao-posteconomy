// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './DAO.sol';
import './DefaultUsers.sol';


contract ManagerDAOs {
    mapping(address => DAO) public daos;
    address[] daoAddresses;
    bool daoCreated;

    event DAOCreated(address dao, string name);
    event DAOJoined(address dao, address member);

    function createDAO(
        string memory _name,
        string memory _description,
        string memory _scope,
        string memory _start,
        string memory _end
    ) public {
        DAO newDAO = new DAO(_name, _description, _scope, msg.sender, _start, _end);
        daos[address(newDAO)] = newDAO;
        daoAddresses.push(address(newDAO));

        emit DAOCreated(address(newDAO), _name);
    }

    function joinDAO(address _dao) public {
        DAO dao = daos[_dao];
        require(!isMember(_dao, msg.sender), "member");
        dao.addMember(msg.sender);

        emit DAOJoined(_dao, msg.sender);
    }

    function addDefaultDAOs() public {
        if (daoCreated) {
            return;
        }
        daoCreated = true;
        createDAOs();
    }

    function createDAOs() public {
        DAO rejected = new DAO(
            "Browser programming language",
            "It is necessary to create a complete tool for creating web applications that will allow developers to manage the browser and its interface. This programming language must provide the ability to interact with a web server, create animations, games, maps and other web services. As a result of development, users will be able to use this language to create unique and functional web applications.",
            "it",
            0x65f13BBFd0c98fc01B8a7A17bf619eC2CFeb7D9a,
            "2024-02-18",
            "2024-02-25"
        );
        daos[address(rejected)] = rejected;
        daoAddresses.push(address(rejected));
        DAO contract_in_progress = new DAO(
            "Two-week tour for Olympiad students of the Belarusian State University",
            "Visit to the Belarusian State University campus: The students could visit the campus and learn about the history, facilities, and academic programs offered by the university. Tour of Belarusian cultural sites.",
            "education",
            0x65f13BBFd0c98fc01B8a7A17bf619eC2CFeb7D9a,
            "2024-03-09",
            "2024-03-23"
        );
        daos[address(contract_in_progress)] = contract_in_progress;
        daoAddresses.push(address(contract_in_progress));

        rejected.setProposalState(0, 1); // rejected
        contract_in_progress.setProposalState(0, 2); // work on contract
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

    function getDAO(address _dao) public view returns (address, string memory, string memory, string memory, uint256, address[] memory) {
        DAO dao = daos[_dao];
        address[] memory daoMemers = new address[](dao.membersCount());

        for (uint256 i = 0; i < dao.membersCount(); i++) {
            daoMemers[i] = dao.members(i);
        }

        return (_dao, dao.name(), dao.description(), dao.scope(), dao.membersCount(), daoMemers);
    }

    function getAllDAOs() public view returns (address[] memory) {
        return daoAddresses;
    }
}
