import React, { useState } from 'react';

export default function ToggleMedia({type}) {
  const [mediaType, setMediaType] = useState('Anime');

  // swaps to other media type when button is pressed
  function toggle() {
    if (mediaType === 'Anime'){
      setMediaType('Manga');
      type('MANGA');
    } else {
      setMediaType('Anime');
      type('ANIME');
    }
  }

  return (
    <div>
      <button type="button" id = "button" onClick = { toggle }> 
        {mediaType}
      </button>
    </div>
  )
}

