// importing CSS
import "./index.css";
// importing Components
import Navbar from "./Components/Navbar/navbar";
import Home from "./Components/Home/home";
// importing Router
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

function App() {

  const router = createBrowserRouter([
    {path : '/' , element : <Navbar />, children : [
      {path : '/' , element: <Home />}
      // {path : "/singUp" , element : <SignUp />},
      // {path : '/singIn' , element : <SingIn />},
      // {path : '/cart' , element : <Cart />},
      // {path : 'order' , element : <Order />}

    ]}
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
