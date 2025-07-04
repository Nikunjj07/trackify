import { AppBar } from "@/components/AppBar";
import { SidebarItem } from "@/components/SidebarItem";
import { JSX } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
        <AppBar landing={false} />
        <div className="flex flex-row">
            <div className="w-66 border-r border-zinc-800 overflow-y-auto h-full mr-4 pt-28">
                <div>
                    <SidebarItem href={"/dashboard"} icon="H" title="Home" />
                    <SidebarItem href={"/dashboard"} icon="H" title="Home" />
                    <SidebarItem href={"/dashboard"} icon="H" title="Home" />
                    <SidebarItem href={"/dashboard"} icon="H" title="Home" />
                </div>
            </div>
            <div className="flex-5">
                {children}
            </div>
        </div>
    </div>
  );
}
