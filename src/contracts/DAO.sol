// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DAO {
    struct Proposal {
        uint256 id;
        address initiator;
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }
    struct VotedStruct {
        address voter;
        uint256 timestamp;
        bool choice;
    }

    string public name;
    address[] public members;
    uint256 public membersCount;

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    mapping(address => uint256[]) private stakeholderVotes;
    mapping(uint256 => VotedStruct[]) private votedOn;

    constructor(string memory _name, address _initiator) {
        name = _name;
        members.push(_initiator);
        membersCount++;
    }

    function addMember(address _member) public {
        members.push(_member);
        membersCount++;
    }

    function createProposal(
        address _initiator,
        string memory _title,
        string memory _description
    ) public {
        proposals[proposalCount] = Proposal(
            proposalCount,
            _initiator,
            _title,
            _description,
            0,
            0,
            false
        );
        proposalCount++;
    }

    function getProposals() public view returns (Proposal[] memory) {
        Proposal[] memory daoProposals = new Proposal[](proposalCount);

        for (uint256 i = 0; i < proposalCount; i++) {
            Proposal storage proposal = proposals[i];
            daoProposals[i] = proposal;
        }

        return daoProposals;
    }

    function vote(uint256 _proposalId, bool choice) public {
        require(isMember(msg.sender), "Only members can vote");
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal has already been executed");
        uint256[] memory tempVotes = stakeholderVotes[msg.sender];
        for (uint256 v = 0; v < tempVotes.length; v++) {
            if (proposal.id == tempVotes[v])
                revert("Double voting not allowed");
        }

        if (choice) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }
        stakeholderVotes[msg.sender].push(proposal.id);
        votedOn[proposal.id].push(
            VotedStruct(
                msg.sender,
                block.timestamp,
                choice
            )
        );
    }

    function getVotesOf(uint256 proposalId)
        external
        view
        returns (VotedStruct[] memory)
    {
        return votedOn[proposalId];
    }

    function isMember(address _member) public view returns (bool) {
        for (uint256 i = 0; i < membersCount; i++) {
            if (members[i] == _member) {
                return true;
            }
        }
        return false;
    }

//    function executeProposal(uint256 _proposalId) public {
//        Proposal storage proposal = proposals[_proposalId];
//        require(!proposal.executed, "Proposal has already been executed");
//        require(proposal.votesFor >= quorum, "Proposal does not have enough support");
//
//        proposal.executed = true;
//        // execute proposal code here
    // }
}
