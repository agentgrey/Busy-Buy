// Import CSS
import "./index.css";
// Import Components
import Navbar from "./Components/Navbar/navbar";
import SignUp from "./Components/SignUpPage/signUp";
import SignIn from "./Components/SignInPage/signIn";
import Home from "./Components/Home/home";
// Import Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import CustomContext
import CustomContex from './context';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/signup', element: <SignUp /> },
        { path: '/signin', element: <SignIn /> },
        // { path: '/cart', element: <Cart /> },
        // { path: '/order', element: <Order /> }
      ]
    }
  ]);

  return (
    <CustomContex>
      <RouterProvider router={router}/>
    </CustomContex>
  );
}

export default App;
