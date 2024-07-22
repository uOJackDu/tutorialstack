import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import './CommunityPage.css';
import Button from './Button';
import TextBox from './TextBox';

const CommunityPage = ({ tutorials, joinedCommunities, setJoinedCommunities }) => {
  const { community } = useParams();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleJoinCommunity = () => {
    if (joinedCommunities.includes(community)) {
      setJoinedCommunities(joinedCommunities.filter(c => c !== community));
    } else {
      setJoinedCommunities([...joinedCommunities, community]);
    }
  };

  const handleWritePost = () => {
    navigate(`/community/${community}/write-post/`);
  };

  const filterTutorials = (tutorials, query, community) => {
    if (!query) {
      return tutorials.filter(tutorial => tutorial.community === community);
    }
    query = query.toLowerCase();
    const tagQueries = query.match(/\+[^\s]+/g) || [];
    const nonTagQuery = query.replace(/\+[^\s]+/g, '').trim();

    return tutorials.filter((tutorial) => {
      const matchesTags = tagQueries.every(tagQuery =>
        tutorial.tags.some(tag => tag.toLowerCase().includes(tagQuery.slice(1)))
      );

      const matchesNonTagQuery = nonTagQuery
        ? tutorial.title.toLowerCase().includes(nonTagQuery) ||
          tutorial.author.toLowerCase().includes(nonTagQuery)
        : true;

      return tutorial.community === community && matchesTags && matchesNonTagQuery;
    });
  };

  const filteredTutorials = filterTutorials(tutorials, search, community);

  return (
    <div className="community-page">
      <h2>{community} Community</h2>
      <div className="button-group">
        <Button
          onClick={handleJoinCommunity}
          className={joinedCommunities.includes(community) ? 'joined-button' : 'join-button'}
        >
          {joinedCommunities.includes(community) ? 'Joined' : 'Join'}
        </Button>
        <Button onClick={handleWritePost}>Write a Tutorial</Button>
      </div>
      <div className="search-section">
        <div className="search-bar-row">
          <TextBox
            className="search-bar"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <Button className="search-button">Search</Button>
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

export default CommunityPage;
