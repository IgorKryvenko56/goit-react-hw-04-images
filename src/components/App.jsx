import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button/Button';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.css';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const API_KEY = '35695816-a21dc46a31ad12c59a935ea58';
const BASE_URL = 'https://pixabay.com/api/';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  

  useEffect(() => {
    const fetchImages = async () => {
      if (searchQuery === '') {
        setPage(1);
        setImages([]);
        return; // Return early if searchQuery is empty
      }
      setLoading(true);
      setError(null);

      const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
        searchQuery
      )}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;

      try {
        const response = await axios.get(url);
        const { hits } = response.data;

        if (page === 1) {
          setImages(hits);
        } else {
          setImages(prevImages => [...prevImages, ...hits]);
        }

        setError(null);
        
      } catch (error) {
        if (error.response) {
          setError('Error while fetching images.');
        } else if (error.request) {
          setError('Network error. Please check your internet connection.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } finally {
        setLoading(false);
      }  
    };
    
      fetchImages();
  }, [page, searchQuery]);

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(1); // reset to 1 page
    setImages([]); // clear the images from previous query
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = image => {
    const { largeImageURL } = image;
    setSelectedImage(largeImageURL);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {images.length > 0 && (
        <ImageGallery items={images} onImageClick={handleImageClick} />
      )}
      {!loading && images.length > 0 && (
        <Button onClick={handleLoadMore}>Load More</Button>
      )}
      {showModal && (
        <Modal
          image={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
