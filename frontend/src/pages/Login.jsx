import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {

  setLoading(true);

  setTimeout(() => {

    if (
      email === "admin@gmail.com" &&
      password === "123456"
    ) {

      localStorage.setItem("isLoggedIn", "true");

      toast.success("Login Successful");

      navigate("/dashboard");

    } else {

      toast.error("Invalid Email or Password");

    }

    setLoading(false);

  }, 1000);

};

  return (

    <div className="login-container">

      <div className="login-box">

        <h1>InvoiceFlow</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

      </div>

    </div>

  );

}

export default Login;