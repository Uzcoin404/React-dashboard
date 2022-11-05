import {
    ChartPie,
    DocumentReport,
    ShoppingBag,
    Inbox,
    LockClosed,
    ClipboardList,
    Collection,
    Support,
} from "../lib/icons/Icons";
import pages from "../layout/pages";

const MenuList = [
    {
        icon: <ChartPie />,
        title: "Overview",
        to: "/",
    },
    {
        icon: <DocumentReport />,
        title: "Pages",
        items: pages,
    },
    {
        icon: <ShoppingBag />,
        title: "Sales",
        items: [
            {
                title: "Product List",
                items: [
                    {
                        title: "Something1",
                        to: "/something1",
                    },
                    {
                        title: "Something2",
                        to: "/something2",
                    },
                ],
            },
            {
                title: "Billing",
                to: "/dashboard/billing",
            },
            {
                title: "Invoice",
                to: "/dashboard/invoice",
            },
        ],
    },
    {
        icon: <Inbox />,
        title: "Messages",
        to: "/inbox",
    },
    {
        icon: <LockClosed />,
        title: "Authentication",
        to: "/auth",
        divider: true,
    },
    {
        icon: <ClipboardList />,
        title: "Docs",
        to: "/dashboard/docs",
    },
    {
        icon: <Collection />,
        title: "Components",
        to: "/dashboard/components",
    },
    {
        icon: <Support />,
        title: "Help",
        to: "/dashboard/help",
    },
];
export default MenuList;