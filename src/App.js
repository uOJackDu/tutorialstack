import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import BrowsePage from './components/BrowsePage';
import CommunityPage from './components/CommunityPage';
import TutorialDetailPage from './components/TutorialDetailPage';
import WritePostPage from './components/WritePostPage';
import tutorialsData from './tutorials';
import './App.css';

function App() {
  const [tutorials, setTutorials] = useState(tutorialsData);
  const [userName, setUserName] = useState('anonymous');
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [likedTutorials, setLikedTutorials] = useState([]);
  const [bookmarkedTutorials, setBookmarkedTutorials] = useState([]);

  return (
    <Router basename="/tutorialstack">
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage tutorials={tutorials} />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route
              path="/community/:community"
              element={<CommunityPage
                tutorials={tutorials}
                joinedCommunities={joinedCommunities}
                setJoinedCommunities={setJoinedCommunities}
              />}
            />
            <Route
              path="/tutorial/:community/:id"
              element={<TutorialDetailPage
                userName={userName}
                tutorials={tutorials}
                setTutorials={setTutorials}
                likedTutorials={likedTutorials}
                setLikedTutorials={setLikedTutorials}
                bookmarkedTutorials={bookmarkedTutorials}
                setBookmarkedTutorials={setBookmarkedTutorials}
              />}
            />
            <Route
              path="community/:community/write-post"
              element={<WritePostPage
                tutorials={tutorials}
                setTutorials={setTutorials}
              />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
