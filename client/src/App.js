
//  import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import UserAuth from './pages/UserAuth';

import CreateMail from './components/CreateMail';
import Header from './components/Header';
// import Inbox from './components/Inbox';
import { Provider } from "react-redux";
import store from './context/store';
import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className='app'>
        <Header/>
        <Routes>
          <Route path='/auth' element={<UserAuth/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/create-mail' element={<CreateMail/>} />
          {/* <Route path='/inbox' element={<Inbox/>} /> */}

        </Routes>
        
      </div>
    </BrowserRouter>

    </Provider>
  );
}

export default App;
