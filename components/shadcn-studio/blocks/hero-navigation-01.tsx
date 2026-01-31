'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { useMedia } from 'react-use';
import { ChevronRightIcon, CircleDotIcon, MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import Logo from '@/components/shadcn-studio/logo';
import { cn } from '@/lib/utils';

type NavigationSection = {
  type: 'section';
  title: string;
  items: NavigationItem[];
};

type NavigationItem = {
  title: string;
  href: string;
  icon?: ReactNode;
  badge?: ReactNode;
  description?: string;
};

type Navigation = {
  title: string;
  contentClassName?: string;
} & (
  | {
      items: NavigationSection[];
      splitItems: true;
      href?: never;
    }
  | {
      items: NavigationItem[];
      splitItems?: never | false;
      href?: never;
    }
  | {
      items?: never;
      splitItems?: never;
      href: string;
    }
);

const ListItem = (props: {
  title: NavigationItem['title'];
  href: NavigationItem['href'];
  icon?: NavigationItem['icon'];
  badge?: NavigationItem['badge'];
  description?: NavigationItem['description'];
  splitItems?: boolean;
}) => {
  const { title, href, icon, badge, description, splitItems } = props;

  return (
    <li className={cn({ 'min-h-[4.875rem]': description && splitItems })}>
      <NavigationMenuLink href={href} className={cn({ 'flex flex-row items-start gap-2': icon })}>
        {icon && (
          <span className="flex aspect-square size-7 shrink-0 items-center justify-center rounded-sm border bg-popover [&_svg]:size-4 [&_svg]:text-popover-foreground">
            {icon}
          </span>
        )}
        {description ? (
          <div className="space-y-0.5">
            <div className={cn('font-medium', { 'flex items-center gap-1.5': badge })}>
              {title}
              {badge}
            </div>
            <p className="line-clamp-2 text-muted-foreground">{description}</p>
          </div>
        ) : (
          <div className={cn('font-medium', { 'flex items-center gap-1.5': badge })}>
            {title}
            {badge}
          </div>
        )}
      </NavigationMenuLink>
    </li>
  );
};

const HeroNavigation01 = ({
  navigationData,
  navigationClassName,
}: {
  navigationData: Navigation[];
  navigationClassName?: string;
}) => {
  return (
    <NavigationMenu viewport={false} className={cn('hidden lg:block', navigationClassName)}>
      <NavigationMenuList className="flex-wrap gap-0">
        {navigationData.map((navItem) => {
          if (navItem.href) {
            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={navItem.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent px-3 py-1.5 text-base text-muted-foreground'
                  )}
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger className="bg-transparent px-3 py-1.5 text-base text-muted-foreground [&_svg]:size-4">
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-1/2 w-auto -translate-x-1/2 shadow-lg">
                {navItem.splitItems ? (
                  <div className={cn('grid grid-cols-1 gap-2', navItem.contentClassName)}>
                    {navItem.items.map((section) => (
                      <div key={section.title} className="grid grid-cols-1 gap-2">
                        <div className="px-2 text-sm text-muted-foreground">{section.title}</div>
                        <ul
                          className={cn('grid grid-cols-1 gap-0.5', {
                            'gap-2': section.items.find((item) => item.description),
                          })}
                        >
                          {section.items.map((item, index) => (
                            <ListItem
                              key={index}
                              icon={item.icon}
                              title={item.title}
                              description={item.description}
                              href={item.href}
                              badge={item.badge}
                              splitItems={navItem.splitItems}
                            />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul
                    className={cn(
                      'grid grid-cols-1 gap-0.5',
                      { 'gap-2': navItem.items?.find((item) => item.description) },
                      navItem.contentClassName
                    )}
                  >
                    {navItem.items?.map((item, index) => (
                      <ListItem
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        href={item.href}
                        badge={item.badge}
                      />
                    ))}
                  </ul>
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const HeroNavigation01SmallScreen = ({
  navigationData,
  triggerClassName,
  logo,
  screenSize = 1023,
  actions,
}: {
  navigationData: Navigation[];
  triggerClassName?: string;
  screenSize?: number;
  logo?: React.ReactNode;
  actions?: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMedia(`(max-width: ${screenSize}px)`, false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('inline-flex lg:hidden', triggerClassName)}
        >
          <MenuIcon />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent id="nav-mobile-sheet" side="left" className="w-[18.75rem] gap-0 p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="sr-only" />
          <SheetDescription className="sr-only" />
          <a href="#" onClick={handleLinkClick} className="self-start">
            {logo ?? <Logo className="gap-3" />}
          </a>
        </SheetHeader>
        <div className="space-y-0.5 overflow-y-auto p-2">
          {navigationData.map((navItem, index) => {
            if (navItem.href) {
              return (
                <a
                  key={navItem.title}
                  href={navItem.href}
                  className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                  onClick={handleLinkClick}
                >
                  {navItem.title}
                </a>
              );
            }

            return (
              <Collapsible key={index} className="w-full">
                <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm hover:bg-accent">
                  <div className="flex items-center gap-2">{navItem.title}</div>
                  <ChevronRightIcon className="size-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-90" />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  {navItem.splitItems
                    ? navItem.items.map((item, i) => (
                        <div key={i} className="mt-1.5">
                          <div className="mb-1 pl-[1.125rem] text-xs font-medium text-muted-foreground">
                            {item.title}
                          </div>
                          {item.items.map((subItem, j) => (
                            <a
                              key={j}
                              href={subItem.href}
                              className="ml-[1.125rem] flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                              onClick={handleLinkClick}
                            >
                              {subItem.icon ? subItem.icon : <CircleDotIcon className="size-4" />}
                              {subItem.title}
                            </a>
                          ))}
                        </div>
                      ))
                    : navItem.items?.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          className="ml-3 flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent"
                          onClick={handleLinkClick}
                        >
                          {item.icon ? item.icon : <CircleDotIcon className="size-4" />}
                          {item.title}
                        </a>
                      ))}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
        {actions && (
          <div className="border-t p-4 mt-auto">
            {actions}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export {
  HeroNavigation01,
  HeroNavigation01SmallScreen,
  type Navigation,
  type NavigationItem,
  type NavigationSection,
};
