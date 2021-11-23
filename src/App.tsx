import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import ListReviews from './components/ListReviews/ListReviews';
import Navbar from './components/Navbar/Navbar';
import SingleReview from './components/SingleReview';

export interface singleReviewObj {
  review_id: number;
  title: string;
  owner: string;
  category: string;
  review_body: string;
  designer: string;
  review_img_url: string;
  created_at: string;
  review_votes: number;
  comment_count: number;
}


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <div id="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reviews" element={<ListReviews />} />
          <Route path="/reviews/:category" element={<ListReviews />} />
          <Route path="/reviews/:review_id" element={<SingleReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;