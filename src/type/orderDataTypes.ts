interface TUserProfile {
  _id: string;
  profile: string;
  fullName: string;
  email: string;
  role: string;
  phone: string;
  isActive: boolean;
  isDeleted: boolean;
  address: string;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
  __v: number;
}

interface TSubscription {
  _id: string;
  type: string;
  userId: string;
  packageId: string;
  price: number;
  status: string;
  videoCount: number;
  takeVideoCount: number;
  isDeleted: boolean;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
  __v: number;
}

interface TBrandInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
  productName: string;
  productLink: string;
  productType: string;
}

interface TBrandSocial {
  _id: string;
  tiktokHandle: string;
  tiktokLink: string;
  instragramHandle: string;
  instragramLink: string;
  websiteLink: string;
}

interface TContentInfo {
  _id: string;
  additionalFormate: string;
  videoDuration: string;
  platForm: string;
  usageType: string;
  adHookOrCtaRequest: string;
  exampleVideoLink: string;
  ugcPhoto: string;
}

interface TCharacteristicInfo {
  _id: string;
  ageRange: string;
  gender: string;
  location: string;
  language: string;
  script: string;
}

interface TDoAndDonts {
  _id: string;
  anyWordsNotToUse: string;
  anySpecificWordsUse: string;
  howToPronouncebrandName: string;
  anySpecialRequest: string;
  expressDelivery: string;
}

interface TLastContentInfo {
  _id: string;
  textOverlay: string;
  captions: string;
  music: string;
  extraHook: string;
  extraCta: string;
  videoType: string;
  additionalPerson: string;
  offSiteAttraction: string;
  goalOfProject: string;
  tergetAudience: string;
}

export interface TOrdersData {
  _id: string;
  userId: TUserProfile;
  subscriptionId: TSubscription;
  brandInfo: TBrandInfo;
  brandSocial: TBrandSocial;
  contentInfo: TContentInfo;
  characteristicInfo: TCharacteristicInfo;
  doAndDonts: TDoAndDonts;
  lastContentInfo: TLastContentInfo;
  status: string;
  paymentStatus: string;
  takeVideoCount: number;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}
