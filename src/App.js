import "./App.css";
import { React, Component, useState, useEffect, useRef } from "react";
import Searchbar from "./Components/SearchBar/Searchbar";
import ImageGallery from "./Components/imageGallery/ImageGallery";
// import GalleryItem from "./Components/ImageGalleryItem/ImageGalleryItem";
import axios from "axios";
import Button from "./Components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./Components/Loader/Loader";
function App() {
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
      );
      //zmienić page na pageNumber
      if (page === 1) {
        getImages(response.data.hits)
        setTotalPages(response.data.totalHits)
        setLoading(false)
      }
      else {
        getImages(prevState => ({
          ...prevState,
          ...response.data.hits
        }))
        setTotalPages(response.data.totalHits);
      }
    } catch (error) {
      getError(error.message)
    } finally {
      setLoading(false)
    }
  }
   async function loadMore() {
     setPage(2);
     
    setTimeout(() => {
      window.scrollBy({
        top: 560,
        behavior: "smooth",
      });
    }, 300);
  }
  //componentDidMount
  useEffect(() => {
    setLoading(true);
    initialFetch()
    return function cleanup() {
      setKeyword("");
      setPage(1)
    }
  }, [])

  //componentUpdate
  const prevPageState = useRef();
  const prevKeywordState = useRef();

  useEffect(() => {
    prevPageState.current = page;
    prevKeywordState.current = keyword;
    if (prevPageState !== page) {
      initialFetch();
    }
    if (prevKeywordState !== keyword) {
      setLoading(true);
      getImages([])
    }
  },[keyword,page])
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


//   async componentDidUpdate(previousProps, prevState) {
//     if (prevState.page !== this.state.page) {
//       this.initialFetch();
//     }
//     if (prevState.keyword !== this.state.keyword) {
//       this.setState({
//         isLoading: true,
//         images: [],
//       });
//       this.initialFetch();
//     }
//   }
//   componentWillUnmount() {
//     this.setState({
//       keyword: "",
//       page: 1,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <Searchbar searching={this.searching} />

//         {this.state.isLoading ? (
//           <Loader />
//         ) : (
//           <ImageGallery items={this.state.images} />
//         )}

//         {this.state.images.length < this.state.totalPages && (
//           <Button more={this.loadMore} />
//         )}
//       </div>
//     );
//   }
// }

export default App;
