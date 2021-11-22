import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import ListReviews from './components/ListReviews';
import Navbar from './components/Navbar';
import SingleReview from './components/SingleReview';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div id="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reviews" element={<ListReviews />} />
          <Route path="/reviews/:review_id" element={<SingleReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;