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
        uint256 amount;
        address payable beneficiary;
        string start;
        string end;
        uint256 state;
    }
    struct VotedStruct {
        address voter;
        uint256 timestamp;
        bool choice;
        string username;
        address user_addr;
        uint256 sum;
    }

    string public name;
    string public description;
    string public scope;
    address[] public members;
    uint256 public membersCount;
    string public avatar;

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    mapping(address => uint256[]) private stakeholderVotes;
    mapping(uint256 => VotedStruct[]) private votedOn;

    constructor(
        string memory _name,
        string memory _description,
        string memory _scope,
        address _initiator,
        string memory _start,
        string memory _end
    ) {
        name = _name;
        description = _description;
        scope = _scope;
        members.push(_initiator);
        membersCount++;

        proposals[proposalCount] = Proposal(
            proposalCount,
            _initiator,
            _name,
            _description,
            0,
            0,
            false,
            0,
            payable(_initiator),
            _start,
            _end,
            0
        );
        proposalCount++;
    }

    function addMember(address _member) public {
        members.push(_member);
        membersCount++;
    }

    function createProposal(
        address _initiator,
        string memory _title,
        string memory _description,
        address beneficiary,
        string memory _start,
        string memory _end,
        bool _executed
    ) public {
        proposals[proposalCount] = Proposal(
            proposalCount,
            _initiator,
            _title,
            _description,
            0,
            0,
            _executed,
            0,
            payable(beneficiary),
            _start,
            _end,
            0
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

    function vote(uint256 _proposalId, bool choice, string memory username, address user_addr) payable public {
        Proposal storage proposal = proposals[_proposalId];
        uint256[] memory tempVotes = stakeholderVotes[msg.sender];
        for (uint256 v = 0; v < tempVotes.length; v++) {
            if (proposal.id == tempVotes[v])
                revert("Double voting not allowed");
        }

        if (msg.value > 0) {
            proposal.votesFor++;
            proposal.amount += msg.value;
        } else {
            proposal.votesAgainst++;
        }
        stakeholderVotes[msg.sender].push(proposal.id);
        votedOn[proposal.id].push(
            VotedStruct(
                msg.sender,
                block.timestamp,
                choice,
                username,
                user_addr,
                msg.value
            )
        );
    }

    function voteFake(uint256 _proposalId, bool choice, string memory username, address user_addr) payable public {
        Proposal storage proposal = proposals[_proposalId];
        uint256 amount;

        if (choice) {
            proposal.votesFor++;
            amount = 3e18;
            proposal.amount += amount;
        } else {
            proposal.votesAgainst++;
            amount = 0;
        }
        stakeholderVotes[user_addr].push(proposal.id);
        votedOn[proposal.id].push(
            VotedStruct(
                user_addr,
                block.timestamp,
                choice,
                username,
                user_addr,
                amount
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

    function getProposalDetails(uint256 _proposalId)
        public view returns (string memory, string memory, uint256, uint256, bool, uint256, address, string memory, string memory, uint256, VotedStruct[] memory) {
        Proposal storage proposal = proposals[_proposalId];
        VotedStruct[] memory votes = votedOn[_proposalId];
        return (
            proposal.title,
            proposal.description,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.executed,
            proposal.amount,
            proposal.initiator,
            proposal.start,
            proposal.end,
            proposal.state,
            votes
        );
    }

    function setProposalState(uint256 _proposalId, uint256 _state) public {
        Proposal storage proposal = proposals[_proposalId];
        proposal.state = _state;
     }

    function supportDao() public payable {
        proposals[0].amount += msg.value;
  }


    function closeProposal(address receiver) public payable {
//        require(msg.sender == proposals[0].initiator);

        payable(receiver).transfer(address(this).balance);

        setProposalState(0, 5); // 5 means proposal is finished
  }


//    function executeProposal(uint256 _proposalId) public {
//        Proposal storage proposal = proposals[_proposalId];
//        require(!proposal.executed, "Proposal has already been executed");
//        require(proposal.votesFor >= quorum, "Proposal does not have enough support");
//
//        proposal.executed = true;
//        // execute proposal code here
//     }
}
