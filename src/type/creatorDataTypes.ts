interface UGCExampleVideo {
  key: string;
  url: string;
  _id: string;
}

export interface TSingleCreator {
  _id: string;
  userId: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  country: string;
  state: string;
  postalCode: string;
  city: string;
  street: string;
  houseBuildingNo: string;
  niche: string;
  language: string;
  profession: string;
  gender: string;
  ethnicity: string;
  bodyType: string;
  hairType: string;
  skinType: string;
  tiktokHandle: string;
  tiktokLink: string;
  instragramHandle: string;
  instragramLink: string;
  othersSocialLink: string;
  portfolioLink: string;
  ugcExampleVideo: UGCExampleVideo[];
  introductionvideo: string;
  bankType: string;
  accountHolderName: string;
  accountNumber: string;
  swiftCode: string;
  bankName: string;
  iban: string;
  paypalEmail: string;
  status: string;
  createdAt: string;  // ISO Date String
  updatedAt: string;  // ISO Date String
}
