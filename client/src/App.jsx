import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Main from "./layout/Main";
import Profile from "./pages/profile/index";
import AuthProvider from "./providers/AuthProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: (
            <AuthProvider>
              <Profile />
            </AuthProvider>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
