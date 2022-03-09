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
  async function initialFetch (keyworda, pagea) {
    axios.defaults.baseURL = "https://pixabay.com/api/";
    const APIKEY = "23677449-ed03e132ebac9ff9282502f83";
//nie wiedziałem jak użyć nazwy dlatego a na końcu
    keyworda = keyword;
    pagea = page;
    try {
      const response = await axios.get(
        `?key=${APIKEY}&q=${keyworda}&image_type=photo&orientation=horizontal&per_page=12&page=${pagea}`
      );
      if (page === 1) {
        
          getImages(response.data.hits)
          setTotalPages(response.data.totalHits)
          setLoading(false)
       
      }
      
      else {
        getImages((prevState) => ({
          ...prevState,
          ...response.data.hits
        }))
        setTotalPages(response.data.totalHits)
      }

      // console.log(this.state);
    } catch (error) {
     
      getError(error.message)
    } finally {
      setLoading(false)
    }
  };
  
  function loadMore() {
    setPage(page+1)
    setTimeout(() => {
      window.scrollBy({
        top: 560,
        behavior: "smooth",
      });
    }, 300);
  };
  
   useEffect(() => {
     setLoading(true);
     initialFetch();
   })
 
  const prevStateKeyword = useRef();
  const prevStatePage = useRef();
  useEffect(() => {
    prevStateKeyword.current = keyword;
    prevStatePage.current = page;
    if (prevStatePage.current !== page) {
      initialFetch()
    }
    if (prevStateKeyword.current !== keyword) {
      setLoading(true);
      getImages([]);
      initialFetch();
    }
  })

  useEffect(() => {
    setKeyword("");
    setPage(1)
  }, [])
  return (
    <div>
      <Searchbar searching={searching} />

      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery items={images} />
      )}

      {/* {images.length < totalPages && ( */}
        <Button more={loadMore} />
      
      {/* )} */}
    </div>
  );
}

// class App extends Component {
//   state = {
//     keyword: "",
//     images: [],
//     isLoading: false,
//     error: "",
//     page: 1,
//     totalPages: 0,
//   };
//   searching = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const input = document.querySelector("input").value;
//     // console.log(input);
//     this.setState({ keyword: input });
//     form.reset();
//   };
  // initialFetch = async (keyword, page) => {
  //   axios.defaults.baseURL = "https://pixabay.com/api/";
  //   const APIKEY = "23677449-ed03e132ebac9ff9282502f83";

  //   keyword = this.state.keyword;
  //   page = this.state.page;
  //   try {
  //     const response = await axios.get(
  //       `?key=${APIKEY}&q=${keyword}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  //     );
  //     if (page === 1) {
  //       this.setState({
  //         images: response.data.hits,
  //         totalPages: response.data.totalHits,
  //         isLoading: false,
  //       });
  //     }
  //     // if(){}
  //     else {
  //       this.setState((prevState) => ({
  //         images: [...prevState.images, ...response.data.hits],
  //         totalPages: response.data.totalHits,
  //       }));
  //       // console.log(this.state);
  //     }

  //     // console.log(this.state);
  //   } catch (error) {
  //     this.setState({ error: error.message });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // };
//   loadMore = async () => {
//     this.setState((prevState) => ({
//       page: prevState.page + 1,
//     }));
//     setTimeout(() => {
//       window.scrollBy({
//         top: 560,
//         behavior: "smooth",
//       });
//     }, 300);
//   };
//   async componentDidMount() {
//     this.setState({ isLoading: true });
//     this.initialFetch();
//   }
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
