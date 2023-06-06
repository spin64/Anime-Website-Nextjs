import React, { useState } from 'react';
import ToggleMedia from './ToggleMedia';
import Pagination from "./Pagination";

export default function SearchBar({ updateDataArray}) {
  const [searchText, setSearchText] = useState('');
  const [pageNum, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);

  // query format
  const query = `
    query ($id: Int, $page: Int, $perPage: Int, $search: String, $type: MediaType) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media (id: $id, search: $search, type: $type, isAdult: false) {
          id
          title {
            romaji
            english
            native
          }
          format
          episodes
          chapters
          description
          coverImage {
            large
            medium
          }
          genres
        }
      }
    }
  `;

  const [variables, setVariables] = useState({
    search: '',
    page: 1,
    perPage: 10,
    type: 'ANIME',
  });

  const url = 'https://graphql.anilist.co';

  function handlePage(n){   
    /*
    if (pageNum + n <= 0 && n < 0){
      return;
    }

    if (!nextPage && n > 0){
      return;
    }
    */

    setPage(pageNum + n);

    setVariables((prevVariables) => ({
      ...prevVariables,
      page: pageNum,
    }));

    console.log(pageNum);
    updateSearch(variables.type);
  }


  const updateType = (newType) => {
    console.log('Updating type:', newType);

    // update search variables with new type
    setVariables((prevVariables) => ({
      ...prevVariables,
      type: newType,
    }));

    // update the search with the new type
    updateSearch(newType);
  };

  async function updateSearch(newType) {
    console.log('Updating search');

    const updatedVariables = {
      ...variables,
      page: pageNum,
      search: searchText,
      type: newType,
    };

    // Try to fetch data
    try {
      const data = await getData(updatedVariables);
      updateDataArray(data.media);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // fetch data
  async function getData(updatedVariables) {
    // fetch options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: updatedVariables,
      }),
    };

    // get data
    const response = await fetch(url, options);
    const jsonData = await response.json();

    setNextPage(jsonData.data.Page.pageInfo.hasNextPage);
    return jsonData.data.Page;
  }

  return (
    <>
      <div className="container">
        <ToggleMedia type={updateType} />
        <input
          type="text"
          id="searchBar"
          placeholder="Enter Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={() => updateSearch(variables.type)}>
          Search
        </button>
        <Pagination page={handlePage} />
      </div>
    </>
  );
}