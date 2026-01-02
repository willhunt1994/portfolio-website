export interface NavigationItem {
  icon?: React.ReactNode;
  title: string;
  href: string;
  description?: string;
}

export interface ImageSection {
  img: string;
  href: string;
  title: string;
  description: string;
}

export interface Navigation {
  title: string;
  href?: string;
  subtitle?: string;
  imgSubtitle?: string;
  contentClassName?: string;
  items?: NavigationItem[];
  imageSection?: ImageSection;
}

