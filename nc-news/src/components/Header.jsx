import { Link } from 'react-router-dom';

const Header = ({ title })=>{

  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
      </nav>
    </header>
  );
}

export default Header