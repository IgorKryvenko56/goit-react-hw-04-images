import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button/Button';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import './App.css';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import '../styles.css';


const API_KEY = '35695816-a21dc46a31ad12c59a935ea58';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async () => {
    const url = `https://pixabay.com/api/?q=${encodeURIComponent(
      searchQuery
    )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      setLoading(true);

      const response = await axios.get(url);
      const { hits } = response.data;

      setImages(prevImages => [...prevImages, ...hits]);
      setPage(prevPage => prevPage + 1);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchData = async () => {
      await fetchImages();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
    fetchImages();
  };

  const handleOpenModal = selectedImage => {
    setShowModal(true);
    setSelectedImage(selectedImage);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <ImageGallery items={images} onImageClick={handleOpenModal} />
      {showModal && <Modal image={selectedImage} onClose={handleCloseModal} />}
      {images.length > 0 && !loading && (
        <Button onClick={fetchImages}>Load More</Button>
      )}
    </div>
  );
};


export default App;









