import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from "../utils/api"; 
import { useUser } from "../components/UserContext";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const { signIn } = useUser();
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    getUserByUsername(username)
      .then((user) => {
        signIn(user);
        navigate("/"); 
      })
      .catch(() => setError("User not found"));
  };

  return (
    <form id='sign-in' onSubmit={handleSignIn}>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignIn;
