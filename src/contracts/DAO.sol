// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DAO {
    struct Proposal {
        address proposer;
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }

    string public name;
    address[] public members;
    uint256 public membersCount;

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
//    mapping(address => bool) public membersMap;

    constructor(string memory _name, address _creator) {
        name = _name;
        members.push(_creator);
        membersCount++;
    }

    function addMember(address _member) public {
        members.push(_member);
        membersCount++;
    }

//    function createProposal(string memory _description) public {
//        require(membersMap[msg.sender], "Only members can create proposals");
//        proposals[proposalCount] = Proposal(msg.sender, _description, 0, 0, false);
//        proposalCount++;
//    }

//    function vote(uint256 _proposalId, bool _inSupport) public {
//        require(membersMap[msg.sender], "Only members can vote");
//        Proposal storage proposal = proposals[_proposalId];
//        require(!proposal.executed, "Proposal has already been executed");
//
//        if (_inSupport) {
//            proposal.votesFor++;
//        } else {
//            proposal.votesAgainst++;
//        }
//    }

//    function executeProposal(uint256 _proposalId) public {
//        Proposal storage proposal = proposals[_proposalId];
//        require(!proposal.executed, "Proposal has already been executed");
//        require(proposal.votesFor >= quorum, "Proposal does not have enough support");
//
//        proposal.executed = true;
//        // execute proposal code here
    // }
}
//
//contract MultipleDAOs {
//    mapping(address => DAO) public daos;
//
//    function createDAO(uint256 _quorum) public {
//        DAO newDAO = new DAO(_quorum);
//        daos[address(newDAO)] = newDAO;
//    }
//
//    function addMember(address _dao, address _member) public {
//        DAO dao = daos[_dao];
//        dao.addMember(_member);
//    }
//
//    function createProposal(address _dao, string memory _description) public {
//        DAO dao = daos[_dao];
//        dao.createProposal(_description);
//    }
//
//    function vote(address _dao, uint256 _proposalId, bool _inSupport) public {
//        DAO dao = daos[_dao];
//        dao.vote(_proposalId, _inSupport);
//    }
//
//    function executeProposal(address _dao, uint256 _proposalId) public {
//        DAO dao = daos[_dao];
//        dao.executeProposal(_proposalId);
//    }
// }
