import { ReactNode } from "react";

export type NavbarMenuItem = {
  name: string;
  page: string;
  icon: ReactNode;
  classNames?: string;
};

export type NavbarMenuGroup = {
  name: string;
  items: NavbarMenuItem[];
};

export type Navbar = {
  items: NavbarMenuGroup[];
  head: NavbarMenuItem | null;
};

export const mainMenu: Navbar = {
  items: [
    {
      name: "Products",
      items: [
        {
          name: "Products",
          page: "/dashboard/products",
          icon: <i className="bi bi-rocket-takeoff-fill"></i>,
        },
        {
          name: "API Docs",
          page: "/docs/api-docs",
          icon: <i className="bi bi-file-earmark-code-fill"></i>,
        },
      ],
    },
    {
      name: "Account",
      items: [
        {
          name: "Upgrade",
          page: "/dashboard/account/upgrade",
          icon: <i className="bi bi-rocket-takeoff-fill"></i>,
        },
        {
          name: "Usage",
          page: "/dashboard/account/usage",
          icon: <i className="bi bi-pie-chart-fill"></i>,
        },
        {
          name: "Settings",
          page: "/dashboard/account/settings",
          icon: <i className="bi bi-gear-fill"></i>,
        },
      ],
    },
    {
      name: "",
      items: [
        {
          name: "Logout",
          page: "/logout",
          icon: <i className="bi bi-door-open-fill"></i>,
          classNames: "dashboard-menu-item-red",
        },
      ],
    },
  ],
  head: null,
};
export const backItem: NavbarMenuItem = {
  name: "Back",
  page: "back",
  icon: <i className="bi bi-arrow-left"></i>,
};

export const productMenu = (
  productid: string,
  back: NavbarMenuItem | null = null
): Navbar => {
  return {
    items: [
      {
        name: "Product",
        items: [
          {
            name: "Overview",
            page: `/dashboard/products/${productid}`,
            icon: <i className="bi bi-rocket-takeoff-fill"></i>,
          },
          {
            name: "Analytics",
            page: `/dashboard/products/${productid}/analytics`,
            icon: <i className="bi bi-bar-chart-fill"></i>,
          },
          {
            name: "Settings",
            page: `/dashboard/products/${productid}/settings`,
            icon: <i className="bi bi-gear-fill"></i>,
          },
        ],
      },
    ],
    head: back,
  };
};
