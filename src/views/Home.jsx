import SidebarPanel from '../components/SidebarPanel'
// import ChatLogin from '../components/ChatLogin'
import CreateProposal from '../components/CreateProposal'
import Header from '../components/Header'
import Proposals from '../components/Proposals'
import DAOlist from "../components/DAOlist";
import ProposalCreateForm from "../components/ProposalCreateForm";
import "../styles/Home.css";
import SearchBar from "../components/SearchBar";

const Home = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <SidebarPanel/>
                <div className="main-content">
                    <SearchBar/>
                    <DAOlist/>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <ProposalCreateForm/>
        </>
    )
}

export default Home
