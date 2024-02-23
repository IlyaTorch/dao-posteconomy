// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './DAO.sol';
import './DefaultUsers.sol';


contract ManagerDefaultUsers {
    bool usersAdded;

    function addDefaultUserAndVotes(address rej, address in_progr) public {
        if (usersAdded) {
            return;
        }
        usersAdded = true;

        DAO rejected = DAO(rej);
        DAO contract_in_progress = DAO(in_progr);

        DefaultUsers usersDefault = new DefaultUsers();
        DefaultUsers.User[] memory users = usersDefault.getUsers();
        for (uint i = 0; i < users.length; i++) {
            DefaultUsers.User memory currentUser = users[i];
            rejected.voteFake(0, false, currentUser.username, currentUser.userAddress);
            rejected.addMember(currentUser.userAddress);
            contract_in_progress.voteFake(0, true, currentUser.username, currentUser.userAddress);
            contract_in_progress.addMember(currentUser.userAddress);
        }
    }
}
