import Header from "../components/Header";
import SidebarPanel from "../components/SidebarPanel";
import ProposalCreateForm from "../components/ProposalCreateForm";


const ProposalCreate = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <SidebarPanel/>
                <ProposalCreateForm />
            </div>

        </>
    )
};

export default ProposalCreate;
