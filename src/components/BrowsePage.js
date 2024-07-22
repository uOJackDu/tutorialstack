import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BrowsePage.css';
import communities from '../communities';
import TextBox from './TextBox';

const BrowsePage = () => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filterCommunities = (communities, query) => {
    if (!query) {
      return communities;
    }
    query = query.toLowerCase();

    return communities.filter((community) => {
      return (
        community.title.toLowerCase().includes(query)
        || community.description.toLowerCase().includes(query)
      );
    });
  };

  const filteredCommunities = filterCommunities(communities, search);

  return (
    <div className="browse-page">
      <h2>Browse Communities</h2>
      <TextBox
        value={search}
        onChange={handleSearchChange}
        placeholder="Search communities..."
      />
      <div className="community-list">
        {filteredCommunities.map((community, index) => (
          <Link to={`/community/${community.title}`} key={index} className="community-item">
            <h3>{community.title}</h3>
            <p>{community.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowsePage;
