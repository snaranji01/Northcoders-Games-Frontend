import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getCategories } from './api';
import './App.css';
import ChooseUser, { User } from './components/ChooseUser/ChooseUser';
import ListReviews from './components/ListReviews/ListReviews';
import Navbar from './components/Navbar/Navbar';
import SingleReview from './components/SingleReview/SingleReview';
import { UserContext } from './contexts/User';
import ChooseUser from './components/ChooseUser/ChooseUser';

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
        const categoriesArray = resCategories.map((category: resCategory): string => category.slug);
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
            <Route path="/" element={<ListReviews
                allCategories={allCategories}
                filterParams={filterParams}
                setFilterParams={setFilterParams}
              />} />
            <Route path="/reviews" element={
              <ListReviews
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