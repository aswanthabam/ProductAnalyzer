import { ReactNode } from "react";

export type NavbarMenuItem = {
  name: string;
  page: string;
  icon: ReactNode;
};

export type NavbarMenuGroup = {
  name: string;
  items: NavbarMenuItem[];
};

export const mainMenu: NavbarMenuGroup[] = [
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
];
