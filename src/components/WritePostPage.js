import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './WritePostPage.css';
import Button from './Button';
import TextBox from './TextBox';

const WritePostPage = ({ tutorials, setTutorials }) => {
  const { community } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [tags, setTags] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTutorial = {
      id: Date.now(),
      title,
      author: 'anonymous',
      content,
      likes: 0,
      comments: 0,
      bookmarks: 0,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      community,
      image,
      video
    };

    setTutorials([...tutorials, newTutorial]);
    navigate(`/community/${community}`);
  };

  return (
    <div className="write-post-page">
      <h2>Write a Post in {community} Community</h2>
      <form onSubmit={handleSubmit} className="write-post-form">
        <div className="form-group">
          <TextBox
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            className="write-post-title"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your content here..."
            className="write-post-content"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags" className="file-label">Tags (comma separated)</label>
          <TextBox
            value={tags}
            onChange={handleTagsChange}
            placeholder="Tags"
            className="write-post-tags"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image-upload" className="file-label">Upload Image</label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="video-upload" className="file-label">Upload Video</label>
          <input
            type="file"
            id="video-upload"
            accept="video/*"
            onChange={handleVideoChange}
            className="file-input"
          />
        </div>
        <Button type="submit" className="post-button">Post</Button>
      </form>
    </div>
  );
};

export default WritePostPage;
