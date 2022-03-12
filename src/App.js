import "./App.css";
import { React, useState, useEffect, useRef } from "react";
import Searchbar from "./Components/SearchBar/Searchbar";
import ImageGallery from "./Components/imageGallery/ImageGallery";
// import GalleryItem from "./Components/ImageGalleryItem/ImageGalleryItem";
import axios from "axios";
import Button from "./Components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./Components/Loader/Loader";
export default function App() {
  const [keyword, setKeyword] = useState("");
  const [images, getImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, getError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  function searching(e) {
    e.preventDefault();
    const form = e.target;
    const input = document.querySelector("input").value;
    setKeyword(input);
    form.reset();
  }
  async function initialFetch(searchValue, pageNumber) {
    axios.defaults.baseURL = "https://pixabay.com/api/";
    const APIKEY = "23677449-ed03e132ebac9ff9282502f83";
    searchValue = keyword;
    pageNumber = page;
    try {
      const response = await axios.get(
        `?key=${APIKEY}&q=${searchValue}&image_type=photo&orientation=horizontal&per_page=12&page=${pageNumber}`
      )
      if (page === 1) {
        getImages(response.data.hits)
        setTotalPages(response.data.totalHits)
        setLoading(false)
      }
      else {
        getImages((prevImages) => [...prevImages, ...response.data.hits]);
        setTotalPages(response.data.totalHits);
      }
    } catch (error) {
      getError(error.message)
    } finally {
      setLoading(false)
    }
  }
  function loadMore() {
     setPage(page +1);
    setTimeout(() => {
      window.scrollBy({
        top: 560,
        behavior: "smooth",
      });
    }, 300);
  }
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value])
    return ref.current
  }
  useEffect(() => {
    setLoading(true);
    initialFetch()
    return function cleanup() {
      setKeyword("");
      setPage(1);
      getImages([])
    }
  }, [])

  const prevKeyword=usePrevious(keyword)
  useEffect(() => {
    if (prevKeyword !== keyword) {
      setLoading(true);
      getImages([])
      setPage(1);
      
    } else {
      initialFetch()
    }
  },[keyword,page,prevKeyword])
  return (
      <div>
        <Searchbar searching={searching} />

        {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery items={images} />
        )}

        {images.length < totalPages && (
          <Button more={loadMore} />
        )}
      </div>
    );

}
