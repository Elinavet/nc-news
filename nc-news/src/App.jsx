import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'
import ArticlesList from './components/ArticlesList'
import SingleArticle from './components/SingleArticle'

function App() {

  return (
    <>
      <Header title="NC News" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/articles' element={<ArticlesList />} />
        <Route path='/articles/:article_id' element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;
