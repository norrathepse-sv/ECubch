export interface CommitteeMember {
  id: number;
  name: string;
  role: string;
  imageUrl?: string;
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  tag: string;
}