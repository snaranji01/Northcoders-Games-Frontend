import { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getReviews } from './api';
import './App.css';
import Homepage from './components/Homepage';
import ListReviews from './components/ListReviews/ListReviews';
import Navbar from './components/Navbar';
import SingleReview from './components/SingleReview';

export interface singleReviewObj {
  review_id: number;
  title: string;
  designer: string;
  owner: string;
  review_img_url: string;
  category: string;
  created_at: string;
  review_votes: number;
  comment_count: number;
}




function App() {

  const [reviewListData, setReviewListData] = useState<singleReviewObj[]>([]);

  useEffect(() => {
    getReviews().then(response => setReviewListData(response))
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <div id="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reviews" element={<ListReviews reviewListData={reviewListData} />} />
          <Route path="/reviews/:review_id" element={<SingleReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;