import "./App.css";
import { React, Component } from "react";
import Searchbar from "./Components/SearchBar/Searchbar";
import ImageGallery from "./Components/imageGallery/ImageGallery";
// import GalleryItem from "./Components/ImageGalleryItem/ImageGalleryItem";
import axios from "axios";
import Button from "./Components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./Components/Loader/Loader";
class App extends Component {
  state = {
    keyword: "",
    images: [],
    isLoading: false,
    error: "",
    page: 1,
    totalPages: 0,
  };
  searching = async (e) => {
    e.preventDefault();
    const form = e.target;
    const input = document.querySelector("input").value;
    // console.log(input);
    this.setState({ keyword: input });
    form.reset();
  };
  initialFetch = async (keyword,page) => {
    axios.defaults.baseURL = "https://pixabay.com/api/";
    const APIKEY = "23677449-ed03e132ebac9ff9282502f83";

    keyword = this.state.keyword;
   page = this.state.page;
    try {
      const response = await axios.get(
        `?key=${APIKEY}&q=${keyword}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
      );
      if (page === 1) {
        this.setState({
          images: response.data.hits,
          totalPages: response.data.totalHits,
          isLoading: false,
        });
      }
      // if(){}
      else {
        this.setState((prevState) => ({
          images: [...prevState.images, ...response.data.hits],
          totalPages: response.data.totalHits,
        }));
        // console.log(this.state);
      }

      // console.log(this.state);
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  loadMore = async () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
    setTimeout(() => {
      window.scrollBy({
        top: 560,
        behavior: "smooth",
      });
    }, 300);
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    this.initialFetch();
  }
  async componentDidUpdate(previousProps, prevState) {
    if (prevState.page !== this.state.page) {
      
      this.initialFetch();
    }
    if (prevState.keyword !== this.state.keyword) {
      this.setState({
        isLoading: true,
        images:[]
      });
      this.initialFetch();
    }
  }
  componentWillUnmount() {
    this.setState({
      keyword: "",
      page: 1
    });
  }

  render() {
    return (
      <div>
        <Searchbar searching={this.searching} />

        {this.state.isLoading ? (
          <Loader />
        ) : (
          <ImageGallery items={this.state.images} />
        )}

        {this.state.images.length < this.state.totalPages && (
          <Button more={this.loadMore} />
        )}
      </div>
    );
  }
}

export default App;
