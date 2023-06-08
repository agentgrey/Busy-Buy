// Import CSS
import "./index.css";
// Import Components
import Navbar from "./Components/Navbar/navbar";
import SignUp from "./Pages/SignUpPage/signUp";
import SignIn from "./Pages/SignInPage/signIn";
import Home from "./Pages/Home/home";
import Cart from "./Pages/Cart/cart";
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
        { path: '/home', element: <Home /> },
        { path: '/signup', element: <SignUp /> },
        { path: '/signin', element: <SignIn /> },
        { path: '/cart', element: <Cart /> },
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
