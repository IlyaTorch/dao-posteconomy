import SidebarPanel from '../components/SidebarPanel'
// import ChatLogin from '../components/ChatLogin'
import CreateProposal from '../components/CreateProposal'
import Header from '../components/Header'
import Proposals from '../components/Proposals'
import DAOlist from "../components/DAOlist";
import DAOcreate from "../components/DAOcreate";
import "../styles/Home.css";

const Home = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <SidebarPanel/>
                <DAOlist/>
            </div>
            {/*<Proposals/>*/}
            {/*<CreateProposal/>*/}
            {/* <ChatLogin /> */}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <DAOcreate/>
        </>
    )
}

export default Home
