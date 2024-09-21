import React, { useEffect, useReducer } from 'react';
import { getAllByTag, getAllFood, getAllTags, search } from '../services/foodService.js';
import Thumbnails from '../components/Thumbnails/Thumbnails.jsx';
import NotFound from '../components/NotFound/NotFound.jsx';
import Search from '../components/Search/Search.jsx'
import Tags from '../components/Tags/Tags.jsx'
import { useParams } from 'react-router-dom';

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then(tags => {
      dispatch({type:'TAGS_LOADED', payload : tags});
      // console.log("This is the tags array",tags);
  })
    .catch(error => console.error('Error loading tags:', error))
    const loadFoods = () => {
      if (tag) {
        // console.log("tag");
        return getAllByTag(tag);
      } else if (searchTerm) {
        // console.log("search");
        return search(searchTerm);
      } else {
        // console.log("none");
        return getAllFood();
      }
    };

    loadFoods().then(foods => {
        // console.log('Foods loaded:', foods); // Log loaded foods
        dispatch({ type: 'FOODS_LOADED', payload: foods });
      })
      .catch(error => console.error('Error loading foods:', error)); // Log any errors
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails foods={foods} />
    </>
  );
}
