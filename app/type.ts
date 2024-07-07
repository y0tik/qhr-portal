export type Ticket = {
  id: string;
  subject: string;
  description: string;
  category: string;
  subCategory: string;
  created_on: Date;
  created_by: string;
  created_by_img: string;
  assigned_to: string;
  assigned_to_img: string;
  status: 'created' | 'ongoing' | 'not-resolved' | 'resolved';
};
