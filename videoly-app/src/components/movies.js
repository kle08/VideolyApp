import React, { Component } from 'react';
import { getMovies, deleteMovie } from '../services/movieService';
import Pagination from './pagination';
import ListGroup from './listGroup';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/genreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';
import { toast } from 'react-toastify';

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 4,
      searchQuery: '',
      selectedGenre: null,
      sortColumn: { path: 'title', order: 'asc' }
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  getPagedData = () => {
    const {
      sortColumn,
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  async componentDidMount() {
    const { data } = await getGenres()
    const genres = [{ _id: '', name: 'All Genres' }, ...data];

    const { data: movies } = await getMovies()
    this.setState({ movies, genres });
  }

  handleGenreSelect = genre => {
    console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    }
    catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted.');
      this.setState({ movies: originalMovies })
    }
  }

  handleLike = movie => {
    console.log('liked clicked', movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { length: count } = this.state.movies;
    const { sortColumn, pageSize, currentPage } = this.state;

    if (count === 0) return <p>There are no more movies in the data </p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className='row'>
        <div className='col-2.5'>
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className='col'>
          <Link
            to='/movies/new'
            className='btn btn-primary'
            style={{ marginBotton: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
