
//  import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import UserAuth from './pages/UserAuth';
import { AuthProvider } from './context/auth';
import CreateMail from './components/CreateMail';
import Header from './components/Header';
import Inbox from './components/Inbox';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className='app'>
        <Header/>
        <Routes>
          <Route path='/auth' element={<UserAuth/>} />
          <Route path='/create-mail' element={<CreateMail/>} />
          <Route path='/inbox' element={<Inbox/>} />

        </Routes>
        
      </div>
    </BrowserRouter>

    </AuthProvider>
    
    
    
  );
}

export default App;
