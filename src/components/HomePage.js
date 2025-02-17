import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import './HomePage.css';
import Button from './Button';
import TextBox from './TextBox';

const HomePage = ({ tutorials }) => {
  const [search, setSearch] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      setSearch(decodeURIComponent(searchQuery));
    }
  }, [location]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filterTutorials = (tutorials, query) => {
    if (!query) {
      return tutorials;
    }
    query = query.toLowerCase();
    const tagQueries = query.match(/\+[^\s]+/g) || [];
    const nonTagQuery = query.replace(/\+[^\s]+/g, '').trim();

    return tutorials.filter((tutorial) => {
      const matchesTags = tagQueries.every(tagQuery =>
        tutorial.tags.some(tag => tag.toLowerCase().includes(tagQuery.slice(1)))
      );

      const matchesNonTagQuery = nonTagQuery
        ? tutorial.title.toLowerCase().includes(nonTagQuery)
          || tutorial.author.toLowerCase().includes(nonTagQuery)
        : true;

      return matchesTags && matchesNonTagQuery;
    });
  };

  const filteredTutorials = filterTutorials(tutorials, search);

  return (
    <div className="home-page">
      <h2>Home</h2>
      <div className="search-section">
        <div className="search-bar-row">
          <TextBox
            className="search-bar"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <Button>Search</Button>
        </div>
        <p className='search-hint'>hint: search by tag using <strong>+tag_name</strong> (e.g. <strong>+computer +hardware how to</strong>)</p>
      </div>
      <div className="tutorial-list">
        {filteredTutorials.map((tutorial, index) => (
          <Link to={`/tutorial/${tutorial.community}/${tutorial.id}`} key={index} className="tutorial-item">
            <h3>{tutorial.title}</h3>
            <div className="tags">
              {tutorial.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
            <div className="tutorial-info">
              <span className="author">{tutorial.author}</span>
              <div className="like-comment">
                <span><FaThumbsUp /> {tutorial.likes}</span>
                <span><FaComment /> {tutorial.comments}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
