import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/Home'
// import Signup from './routes/Signup'
// import Login from './routes/Login';
// import SearchResults from './routes/SearchResults';
// import GetBook from './routes/GetBook';
//import Payment from './routes/Payment';
// import Cart from './routes/Cart';
// import Form from './routes/Form';
import NotFound from './routes/NotFound';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/searchresults' element={<SearchResults />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/cart' element={<Cart />} /> */}
          {/* <Route path='/getbook' element={<GetBook />} /> */}
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;