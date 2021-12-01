import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import { getCategories } from './api';

import { FilterParams, AllCategoriesResponseObj, User } from './types/types';

import Navbar from './components/Navbar/Navbar';
import ReviewsList from './components/ReviewsList/ReviewsList';
import SingleReview from './components/SingleReview/SingleReview';
import ChooseUser from './components/ChooseUser/ChooseUser';

import { UserContext } from './contexts/User';
import ErrorPage from './components/ErrorPage/ErrorPage';
import { AxiosError } from 'axios';

const App = () => {
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    category: '',
    sortBy: '',
    order: ''
  });

  const [error, setError] = useState<AxiosError | Error | null>(null);

  const [currentUser, setCurrentUser] = useState<User | null>(null);




  useEffect(() => {
    getCategories()
      .then(resCategories => {
        const categoriesArray = resCategories.map((category: AllCategoriesResponseObj): string => category.slug);
        setAllCategories(categoriesArray);
      })
      .catch(error => {
        setError(error);
      })
  }, [])



  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar
          allCategories={allCategories}
          filterParams={filterParams}
          setFilterParams={setFilterParams} />
        <div id="App">
          <Routes>
            <Route path="/" element={<ReviewsList
              filterParams={filterParams}
              setFilterParams={setFilterParams}
            />} />
            <Route path="/reviews" element={
              <ReviewsList
                filterParams={filterParams}
                setFilterParams={setFilterParams}
              />
            } />
            <Route path="/reviews/:review_id" element={<SingleReview />} />
            <Route path="/users" element={<ChooseUser />} />
            <Route path="*" element={<ErrorPage error={error} />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;