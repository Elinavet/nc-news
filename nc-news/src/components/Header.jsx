import { Link } from 'react-router-dom';
import { useUser } from "../components/UserContext";

const Header = ({ title })=>{
  const { user, signOut } = useUser();

  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
        {user ? (
          <div className="user-info">
            <img src={user.avatar_url} alt="User avatar" />
            <span>{user.username}</span>
            <button onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </nav>
    </header>
  );
}

export default Header