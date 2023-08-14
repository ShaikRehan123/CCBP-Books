interface AdminRoute {
  path: string;
  name: string;
}

const routes: AdminRoute[] = [
  {
    path: "/",
    name: "Explore",
  },
  {
    path: "/cart",
    name: "Cart",
  },
];

export default routes;
