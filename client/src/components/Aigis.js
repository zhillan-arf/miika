import React from 'react';
import '../assets/aigis.css';

const src = '/assets/videos/aigis.mp4'

const Aigis = () => {
  return (
    <div>
      <video className='aigis-video' autoPlay muted>
        <source src={src} type='video/mp4'/>
      </video>
    </div>
  );
};

export default Aigis;