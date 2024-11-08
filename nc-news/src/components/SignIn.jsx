import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/api"; 
import { useUser } from "../components/UserContext";

const SignIn = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { signIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
        setLoading(false); 
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false); 
      });
  }, []);

  const handleUserSelect = (user) => {
    signIn(user);
    navigate("/"); 
  };

  return (
    <div id="sign-in">
      <h2>Select User to Sign In</h2>
      {loading ? (
        <p id='loading'>Loading users...</p> 
      ) : error ? (
        <p id='error'>{error}</p> 
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div
              className="sign-in-users"
              key={user.username}
              onClick={() => handleUserSelect(user)}
            >
              <img src={user.avatar_url} alt={`${user.name}'s avatar`} />
              <div>
                <p>{user.name}</p>
                <p>{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
  

export default SignIn;

