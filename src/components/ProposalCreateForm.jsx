import {useState} from "react";
import '../styles/ProposalCreateForm.css';
import {createDAO, createProposal, fetchCreateDao} from "../PosteconomyV2";
import {getGlobalState} from "../store";


const ProposalCreateForm = () => {
    const [form_data, setFormData] = useState({
        title: '',
        description: '',
        poster_url: '',
        tags: '',
        budget: undefined,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...form_data, [name]: value });
    };

    const onCreateProposal = async () => {
        const dao = await createDAO(form_data.title, form_data.description, form_data.tags.split(',')[0])
        const dao_addr = dao.events.DAOCreated.returnValues.dao
        const current_date = new Date();
        const end_date = new Date();
        end_date.setDate(current_date.getDate() + 7);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

        await fetchCreateDao({
            title: form_data.title,
            description: form_data.description,
            dao_avatar: form_data.poster_url,
            tags: form_data.tags.split(','),
            members_count: 1,
            dao_addr: dao_addr,
            budget: form_data.budget,
        })
        await createProposal(
            dao_addr,
            form_data.title,
            form_data.description,
            getGlobalState('connectedAccount'),
            current_date.toLocaleDateString('en-US', options),
            end_date.toLocaleDateString('en-US', options),
        )
        location.replace(`/dao/${dao_addr}`);

    }

    return (
        <div className="proposal-create-form">
            <br/>
            <span className="proposal-create-form-header">Initiate your own proposal</span>
            <input
                type="text"
                placeholder="Enter the proposal title"
                onChange={handleChange}
                name="title"
                value={form_data.title}
                required
            />
            <textarea
                placeholder="Enther the proposal description"
                onChange={handleChange}
                name="description"
                value={form_data.description}
                required
            />
            <input
                type="text"
                placeholder="Enter the proposal poster url"
                onChange={handleChange}
                name="poster_url"
                value={form_data.poster_url}
                required
            />
            <input
                type="text"
                name="tags"
                value={form_data.tags}
                onChange={handleChange}
                placeholder="Separate tags with commas"
            />
            <input
                type="number"
                placeholder="Enter the proposal budget"
                onChange={handleChange}
                name="budget"
                value={form_data.budget}
                required
            />

            <button
                onClick={onCreateProposal}
                className="proposal-create-form-button"
            >
                Initiate
            </button>
            <br/>
        </div>
    )
};

export default ProposalCreateForm;
