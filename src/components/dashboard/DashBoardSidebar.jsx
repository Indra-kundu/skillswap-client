
import { Button, Drawer } from "@heroui/react";
import {
    House,
    Bars,
    ListCheck,
    Plus,
    FileMinus,
    CreditCard, Magnifier,
    Check,
    Briefcase,
    FileDollar,
    Gear,
    Persons,
    Bell,
    Person,
    Envelope,
    Palette
} from '@gravity-ui/icons';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";


export default async function DashBoardSidebar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    console.log(user)
    const role = user?.role || "client";

    const daashboardItems = {
        client: [
            { icon: House, label: "Overview", link: "/dashboard/client" },
            { icon: ListCheck, label: "My Task", link: "/dashboard/client/myTask" },
            { icon: Plus, label: "Post Task", link: "/dashboard/client/postTask" },
            { icon: FileMinus, label: "Proposals", link: "/dashboard/client/proposals" },
            { icon: CreditCard, label: "Payment", link: "/dashboard/client/payment" },
        ],

        freelancer: [
            { icon: House, label: "Overview", link: "/dashboard/freelancer" },
            { icon: Magnifier, label: "Browse Task", link: "/dashboard/freelancer/browseTask" },
            { icon: Check, label: "My Proposals", link: "/dashboard/freelancer/myProposals" },
            { icon: Briefcase, label: "Active Projects", link: "/dashboard/freelancer/activeProjects" },
            { icon: FileDollar, label: "Earnings", link: "/dashboard/freelancer/earnings" },
            { icon: Gear, label: "Edit Profile", link: "/dashboard/freelancer/edit-profile" },
        ],

        admin: [
            { icon: House, label: "Overview", link: "/dashboard/admin" },
            { icon: Persons, label: "Users", link: "/dashboard/admin/users" },
            { icon: ListCheck, label: "Tasks", link: "/dashboard/admin/tasks" },
            { icon: Palette, label: "Payments", link: "/dashboard/admin/payments" },
        ],
    };
    const navItems = daashboardItems[role];




    // const navItems = [
    //     { icon: House, label: "Home" },
    //     { icon: Magnifier, label: "Search" },
    //     { icon: Bell, label: "Notifications" },
    //     { icon: Envelope, label: "Messages" },
    //     { icon: Person, label: "Profile" },
    //     { icon: Gear, label: "Settings" },
    // ];

    return (
        <Drawer>
            <Button className={'hidden'} variant="secondary">
                <Bars />
                Menu
            </Button>
            <nav className="flex flex-col gap-1 border border-right-1">
                {navItems.map((item) => (
                    <Link key={item.label} href={item.link}>
                        <button
                            key={item.label}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                            type="button"
                        >
                            <item.icon className="size-5 text-muted" />
                            {item.label}
                        </button>
                    </Link>

                ))}
            </nav>
            <Drawer.Backdrop>
                <Drawer.Content placement="left">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Heading>Navigation</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body>
                            <nav className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <Link key={item.label} href={item.link}>
                                        <button
                                            key={item.label}
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                                            type="button"
                                        >
                                            <item.icon className="size-5 text-muted" />
                                            {item.label}
                                        </button>
                                    </Link>

                                ))}
                            </nav>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}