'use client';

import Image from 'next/image';
import {
  DollarSignIcon,
  UsersIcon,
  TruckIcon,
  SettingsIcon,
  UserIcon,
  ChevronRightIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

const SidebarPage = () => {
  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent className="flex-1">
            <SidebarGroup>
              <SidebarGroupLabel className="pb-4">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0609/4752/9901/files/Ethos_Logo_-_Black.png?v=1767327560"
                  alt="Ethos"
                  width={100}
                  height={40}
                  className="h-8 w-auto"
                />
              </SidebarGroupLabel>
              <Separator className="mb-2" />
              <SidebarGroupContent className="pt-1">
                <SidebarMenu>
                  <SidebarMenuItem className="group">
                    <SidebarMenuButton asChild>
                      <a href='#' className="relative">
                        <DollarSignIcon />
                        <span className="flex-1">Sales</span>
                        <ChevronRightIcon className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity size-4 shrink-0" />
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="group">
                    <SidebarMenuButton asChild>
                      <a href='#' className="relative">
                        <UsersIcon />
                        <span className="flex-1">Team</span>
                        <ChevronRightIcon className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity size-4 shrink-0" />
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="group">
                    <SidebarMenuButton asChild>
                      <a href='#' className="relative">
                        <TruckIcon />
                        <span className="flex-1">Shipping</span>
                        <ChevronRightIcon className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity size-4 shrink-0" />
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div className="p-4">
            <Separator className="mb-4" />
            <SidebarMenu>
              <SidebarMenuItem className="group">
                <SidebarMenuButton asChild>
                  <a href='#' className="relative">
                    <UserIcon />
                    <span className="flex-1">Profile</span>
                    <ChevronRightIcon className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity size-4 shrink-0" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem className="group">
                <SidebarMenuButton asChild>
                  <a href='#' className="relative">
                    <SettingsIcon />
                    <span className="flex-1">Settings</span>
                    <ChevronRightIcon className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity size-4 shrink-0" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <header className='bg-card sticky top-0 z-50 flex h-14 items-center justify-between gap-6 border-b px-4 py-2 sm:px-6'>
            <SidebarTrigger className='[&_svg]:!size-5' />
          </header>
          <main className='size-full flex-1 px-4 py-6 sm:px-6'>
            <Card className='min-h-[600px]'>
              <CardContent className='h-full p-6'>
                <div className='border-card-foreground/10 h-full rounded-md border bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]' />
              </CardContent>
            </Card>
          </main>
          <footer className='bg-card h-10 border-t px-4 sm:px-6'>
            <div className='border-card-foreground/10 h-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]' />
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default SidebarPage
