import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import { getCategories } from './api';

import { IFilterParams, AllCategoriesResponseObj, User } from './types/types';

import Navbar from './components/Navbar/Navbar';
import ReviewsList from './components/ReviewsList/ReviewsList';
import SingleReview from './components/SingleReview/SingleReview';
import ChooseUser from './components/ChooseUser/ChooseUser';

import { UserContext } from './contexts/User';

const App = () => {
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [filterParams, setFilterParams] = useState<IFilterParams>({
    category: '',
    sortBy: '',
    order: ''
  });
  const [currentUser, setCurrentUser] = useState<User>({
    username: "cooljmessy",
    name: "Peter Messy",
    avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002"
  });



  useEffect(() => {
    getCategories()
      .then(resCategories => {
        const categoriesArray = resCategories.map((category: AllCategoriesResponseObj): string => category.slug);
        setAllCategories(categoriesArray);
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
                allCategories={allCategories}
                filterParams={filterParams}
                setFilterParams={setFilterParams}
              />} />
            <Route path="/reviews" element={
              <ReviewsList
                allCategories={allCategories}
                filterParams={filterParams}
                setFilterParams={setFilterParams}
              />
            } />
            <Route path="/reviews/:review_id" element={<SingleReview />} />
            <Route path="/users" element={<ChooseUser />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App;