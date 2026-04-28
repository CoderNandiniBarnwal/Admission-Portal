import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const { email, setEmail, password, setPassword, loginUser } = useUserContext();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8001/user/login", {
        email,
        password,
      });

      if (response.data.success) {
        loginUser(response.data);

        setEmail("");
        setPassword("");

        navigate("/");
        toast.success("User Login successfully");
      }
    } catch (error) {
      console.log(error.response?.data.message);
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login Account
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your login details
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleVerify}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Forgot Password */}
          <div className="text-center text-[#969696]">
            Don't have an account?
            <Link to="/register">
              <span className="cursor-pointer text-[#7337FF] hover:underline">
                Sign up
              </span>
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-sm text-center text-gray-500 mt-5">
          Don’t have an account?
          <Link to="/register">
            <span className="text-red-600 font-medium cursor-pointer hover:underline">
              Register
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
