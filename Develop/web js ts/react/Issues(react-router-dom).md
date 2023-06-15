- `"react-router-dom": "^6.12.1",`
经反复测试此版本通过webpack minimize true打包有问题，无法跳转，false便可以，
6.6.1和6.13.0都没问题

```tsx

import React from 'react';
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      Hello world!
      <Link to={'/a/foo'}>foo</Link>,
      <Link to={'/a/bar'}>bar</Link>,
      <Link to={'/'}>home</Link>,
      <Outlet />
    </div>,
    children: [
      {
        path: 'a',
        element: <div>
          a,
          <Outlet />
        </div>,
        children: [
          {
            path: "foo",
            element: <div>foo</div>,
          },
          {
            path: "bar",
            element: <div>bar</div>,
          }
        ]
      }
    ]
  },

], { basename: '/data-portal' });

function FC() {

  return (
    <React.Fragment>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </React.Fragment>
  )
}

export default FC
```