import { NavLink, useLocation } from "react-router-dom"
import { 
  Home, 
  Network, 
  Files, 
  Settings, 
  Activity,
  HardDrive,
  Users,
  BarChart3
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Network", url: "/network", icon: Network },
  { title: "Files", url: "/files", icon: Files },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Peers", url: "/peers", icon: Users },
  { title: "Storage", url: "/storage", icon: HardDrive },
  { title: "Activity", url: "/activity", icon: Activity },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { open } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"

  return (
    <Sidebar className={open ? "w-64" : "w-16"}>
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <HardDrive className="w-4 h-4 text-primary-foreground" />
            </div>
            {open && (
              <div>
                <h2 className="font-semibold text-sm">StashBox</h2>
                <p className="text-xs text-muted-foreground">v1.0.0</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="w-4 h-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {open && (
          <div className="p-4 mt-auto">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-node-active rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Network Status</span>
              </div>
              <p className="text-xs text-muted-foreground">4/5 nodes online</p>
              <p className="text-xs text-muted-foreground">12 peers connected</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}