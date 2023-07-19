import { createBrowserRouter } from "react-router-dom";

import Main from '../pages/Main';
import IdCard from '../pages/IdCard';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "idcard",
        element: <IdCard />,
      },
      {
        path: "resident ",
        element: <IdCard />,
      },
      {
        path: "gpt",
        element: <NotFound />,
      }
    ],
  },
]);

export default router;
