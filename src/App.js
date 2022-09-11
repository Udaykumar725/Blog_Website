import React ,{useState}from 'react'; 
import './App.css';
import Login from './components/acoount/Login';
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import CreatePost from './create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from '../src/create/Update'
import About from './components/about/About';
import Contact from './components/contact/Contact';



function App() {

  const PrivateRoute=()=>{
    return isAuthenticated ?
    <>
       <Header/>
       <Outlet/>
    </>:<Navigate replace to='/login'/>
  }

  const [isAuthenticated, isUserAuthenticated] = useState(false)


  return (
    <DataProvider>
     <div className="App" style={{marginTop: "60px"}}>
      <Routes>
       <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

       <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
       <Route path='/' element={<Home/>} />
       </Route>
       <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
       <Route path='/create' element={<CreatePost/>} />
       </Route>
       <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
       <Route path='/details/:id' element={<DetailView/>} />
       </Route>
       <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
       <Route path='/update/:id' element={<Update />} />
       </Route>
       <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
       <Route path='/about' element={<About />} />
       </Route>
       <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
       <Route path='/contact' element={<Contact />} />
       </Route>
      </Routes>

        
     
        </div>
     </DataProvider> 
  );
}

export default App;
