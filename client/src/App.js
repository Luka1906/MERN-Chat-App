import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ForgotPassword from "./pages/ForgotPass";
import Register from "./pages/Register";
import Avatars from "./pages/Avatars";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgot-pass",
    element: <ForgotPassword />,
  },
  {
    path: "set-avatar",
    element: <Avatars />,
  },
  {
    path: "chat",
    element: <Chat />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <p className=""></p>
    </>
  );
}

export default App;
