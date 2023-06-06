import React from 'react';
import './style.css';

export default function DataTable({ dataArray }) {
  return (
    <table>
      <thead>
        <tr>
          <th className="col-1"></th>
          <th className="col-sm-1">Title</th>
          <th className="col-sm-7">Description</th>
          <th className="col-1">Episodes/Chapters</th>
          <th className="col-2">Genres</th>
        </tr>
      </thead>
      <tbody>
        {dataArray.map((media) => {
          const id = media.id;
          const title = media.title.romaji;
          const description = media.description;
          const thumbnailUrl = media.coverImage.medium;
          const episodes = media.episodes;
          const chapters = media.chapters;
          const genreArray = media.genres;

          // get genres
          const genre = genreArray.join(' ');

          return (
            <tr key={id}>
              <td>
                <img src={thumbnailUrl} alt="thumbnail"/>
              </td>
              <td>{title}</td>
              <td>{description}</td>
              <td>{episodes}/{chapters}</td>
              <td>{genre}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}