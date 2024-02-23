import React, { useState } from 'react';
import '../styles/SearchBar.css';
import {DEFAULT_TAGS, setGlobalState, useGlobalState} from "../store";

function SearchBar() {
    const [daos] = useGlobalState('daos');
    const [query, setQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const tags = DEFAULT_TAGS;

    const handleChange = (e) => {
        setQuery(e.target.value);
    }


    const toggleTag = (tag) => {
        let updated_tags
        if (selectedTags.includes(tag)) {
            updated_tags = selectedTags.filter(t => t !== tag)
        } else {
            updated_tags = [...selectedTags, tag]
        }
        setSelectedTags(updated_tags)
        let filtered_daos = [...daos]
        for (let i = 0; i < updated_tags.length; i++) {
            filtered_daos = filtered_daos.filter(d => d.tags.includes(updated_tags[i]))
        }
        setGlobalState('filtered_daos', filtered_daos)
        if (!updated_tags.length) {setGlobalState('filtered_daos', daos)}
    }

    return (
        <div className="search-bar">
            <input
                value={query}
                onChange={handleChange}
                className="search-input"
            />

            <div className="tag-list">
                {tags.map(tag => (
                    <button
                        className={`tag-button ${selectedTags.includes(tag) ? 'selected' : ''}`}
                        onClick={() => toggleTag(tag)}
                        key={tag}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;
