export interface EventDetails {
  title: string;
  arabicTitle?: string;
  description: string;
  day: string;
  date: string;
  subtitle: string;
  dayOfWeek: string;
  dayOfMonth: string;
  monthName: string;
  year: string;
  time: string;
  venue: string;
  dressCode: string;
  bg?: string;
  dark?: boolean;
  directionsUrl: string;
  caricatureImage?: string;
  caricatureBadge?: string;
  fullCardImage?: string;
}

export interface GalleryItem {
  image: string;
  caption: string;
}

export interface RsvpData {
  guest_name: string;
  phone: string;
  attending: "yes" | "no";
  guest_count: number;
  events: string[];
  dietary?: string;
  message?: string;
}
