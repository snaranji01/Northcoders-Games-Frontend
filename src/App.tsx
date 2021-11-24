import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getCategories } from './api';
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

interface resCategory {
  slug: string;
  description: string;
}

export interface IFilterParams {
  category: string;
  sortBy: string;
  order: string;
}

function App() {
  const [allCategories, setAllCategories] = useState<string[]>([]);
  // const [filterCategory, setFilterCategory] = useState<string>('');
  // const [filterSortBy, setFilterSortBy] = useState<string>('');
  // const [filterOrder, setFilterOrder] = useState<string>('');
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    category: '',
    sortBy: '',
    order: ''
  });

  useEffect(() => {
    getCategories()
      .then(resCategories => {
        const categoriesArray = resCategories.map((category: resCategory): string => category.slug);
        setAllCategories(categoriesArray);
      })
  }, [])

  return (
    <BrowserRouter>
      <Navbar
        allCategories={allCategories}
        filterParams={filterParams}
        setFilterParams={setFilterParams} />
      <div id="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reviews" element={
            <ListReviews
              allCategories={allCategories}
              filterParams={filterParams}
              setFilterParams={setFilterParams}
            />
          } />
          <Route path="/reviews/:review_id" element={<SingleReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;