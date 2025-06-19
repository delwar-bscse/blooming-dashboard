import { StaticImageData } from "next/image"

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
  id: number
  name: string
  number: string
  email: string
  message: string
  status: "Pending" | "Solved"
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
  id: number;
  title: string;
  videos: number;
  des: string;
  image: StaticImageData;
  price: number;
  features: string[];
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
