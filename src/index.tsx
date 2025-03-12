import React from 'react';
import ReactDom from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouterConfig from './configure/route';

ReactDom.createRoot(document.getElementById('root') as HTMLDivElement).render(
	<RouterProvider router={createBrowserRouter(RouterConfig)} />,
);
