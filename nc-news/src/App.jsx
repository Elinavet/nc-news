import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'
import ArticlesList from './components/ArticlesList'

function App() {

  return (
    <>
      <Header title="NC News" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/articles' element={<ArticlesList />} />
      </Routes>
    </>
  );
}

export default App;
