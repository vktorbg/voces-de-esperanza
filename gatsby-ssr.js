// gatsby-ssr.js
import React from 'react';
import { AudioPlayerProvider } from './src/components/AudioPlayer';
import Layout from './src/components/Layout';

// Wraps the entire app with the Audio Context
export const wrapRootElement = ({ element }) => {
  return <AudioPlayerProvider>{element}</AudioPlayerProvider>;
};

// Wraps every page with the Layout component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};