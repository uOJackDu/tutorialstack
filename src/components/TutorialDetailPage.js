import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaBookmark, FaTrash } from 'react-icons/fa';
import './TutorialDetailPage.css';
import Button from './Button';
import TextBox from './TextBox';

const initialComments = [
  { user: 'David', comment: 'Very helpful, thank you!' },
  { user: 'John', comment: 'I found this confusing.' }
];

const TutorialDetailPage = ({
  tutorials, setTutorials,
  userName,
  likedTutorials, setLikedTutorials,
  bookmarkedTutorials, setBookmarkedTutorials
}) => {
  const { community, id } = useParams();
  const tutorial = tutorials.find(tut => tut.community === community && tut.id === parseInt(id, 10));
  const navigate = useNavigate();

  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { user: userName, comment: newComment }]);
      setNewComment('');
    }
  };

  const handleDeleteTutorial = () => {
    setTutorials(tutorials.filter(tut => tut.id !== parseInt(id, 10)));
    navigate(`/community/${community}/`);
  };

  const handleTagClick = (tag) => {
    const encodedTag = encodeURIComponent(`+${tag}`);
    navigate(`/?search=${encodedTag}`);
  };

  const handleLike = () => {
      if (likedTutorials.includes(tutorial.id)) {
        setLikedTutorials(likedTutorials.filter(tutId => tutId !== tutorial.id));
        setTutorials(tutorials.map(tut => tut.id === tutorial.id ? { ...tut, likes: tut.likes - 1 } : tut));
      } else {
        setLikedTutorials([...likedTutorials, tutorial.id]);
        setTutorials(tutorials.map(tut => tut.id === tutorial.id ? { ...tut, likes: tut.likes + 1 } : tut));
      }
    };

    const handleBookmark = () => {
      if (bookmarkedTutorials.includes(tutorial.id)) {
        setBookmarkedTutorials(bookmarkedTutorials.filter(tutId => tutId !== tutorial.id));
        setTutorials(tutorials.map(tut => tut.id === tutorial.id ? { ...tut, bookmarks: tut.bookmarks - 1 } : tut));
      } else {
        setBookmarkedTutorials([...bookmarkedTutorials, tutorial.id]);
        setTutorials(tutorials.map(tut => tut.id === tutorial.id ? { ...tut, bookmarks: tut.bookmarks + 1 } : tut));
      }
    };

  return (
    <div className="tutorial-detail-page">
      <h2 className="tutorial-title">{tutorial.title}</h2>
      <div className="tutorial-meta">
        <div className="tutorial-tags">
          {tutorial.tags.map((tag, index) => (
            <span key={index} className="tutorial-tag" onClick={() => handleTagClick(tag)}>{tag}</span>
          ))}
        </div>
        <p className="tutorial-author">By <strong><em>{tutorial.author}</em></strong></p>
      </div>
      <p className="tutorial-content">{tutorial.content}</p>
      <div className="feedback">
        <span
          onClick={handleLike}
          className={likedTutorials.includes(tutorial.id) ? 'clicked' : ''}
        ><FaThumbsUp /> {tutorial.likes}</span>
        <span
          onClick={handleBookmark}
          className={bookmarkedTutorials.includes(tutorial.id) ? 'clicked' : ''}
        ><FaBookmark /> {tutorial.bookmarks}</span>
        {userName === tutorial.author && (
          <span onClick={handleDeleteTutorial} className={bookmarkedTutorials.includes(tutorial.id) ? 'bookmarked' : ''}><FaTrash /> Delete</span>
        )}
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <TextBox
            className="comment-textbox"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
            required
          />
          <Button>Post</Button>
        </form>
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p><strong>{comment.user}</strong>: {comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialDetailPage;
