import { StaticImageData } from "next/image"


export type TMessage = {
  _id: string;
  text: string;
  image: string | null;
  seen: boolean;
  sender: string;
  receiver: string;
  chatId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Creator Data type
export type adminCreatorListDataType = {
  id: string;
  name: string;
  category: string[];
  email: string;
  country: string;
  status:"active";
}

// Support Data type
export type SupportDataType = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: "pending" | "solved"; // assuming limited status values
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}


// Creator All Orders Data type
export interface creatorOrderDataType {
  id: string;
  brandName: string;
  deadline: string;
  status: string;
}

// Menu Data type
export interface menuType {
  id: number;
  icon: StaticImageData;
  title: string;
  label: string;
}
// Creator Data type
export type CreatorDataType = {
  id: string
  name: string
  contactNo: string
  email: string
  country: string
  category: string[]
  status: "pending" | "active"
}

// All Creator Steps Data type
export type StepDataType = {
  id: number
  title: string
  label: string
}

// SingleCreator with details Data type
export type SingleCreatorData = {
  id: string;
  image: string;
  name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  address: string;
  language: string;
  gender: string;
  body_type: string;
  ethnicity: string;
  job_profession: string;
  skin_type: string;
  hair_type: string;
  bank_details: {
    bank_name: string;
    bank_email: string;
  };
  social_links: {
    tik_tok_handle: string;
    tik_tok_link: string;
    instagram_handle: string;
    instagram_link: string;
    others_social_link: string;
    portfolio_link: string;
  };
  ugc_videos: string[];
  example_videos: string[];
};

// All Orders Data type
export interface OrdersDataType {
  id: string;
  brandName: string;
  contactNo: string;
  productName: string;
  accountManager: string;
  email: string;
  status: string;   
}

// Package Data type
export type packageDataType = {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  price: number;
  benefits: string[];
  type: "one_time" | "monthly";
  videoCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

// Subscription Data type
export interface subDataType {
  title: string;
  des: string;
  features: string[];
};

// Blog Data type
export type blogDatasType = {
  id: number;
  title: string;
  des: string;
  image: StaticImageData;
}
