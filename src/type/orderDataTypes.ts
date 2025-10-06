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

interface TBrandInfo  {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  websiteUrl: string;
  productName: string;
  brandPronounceName: string;
  isScript: string;
  isVideoCaption: string;
};

interface TBrandSocial {
  tiktokHandle: string;
  tiktokLink: string;
  instragramHandle: string;
  instragramLink: string;
  othersSocialLink: string;
};

interface TVideoInfo {
  productName: string;
  productLink: string;
  productType: string;            // e.g., "Physical", "Digital"
  videoType: string;              // e.g., "Promo", "Tutorial"
  videoLink: string;
  videoLanguage: string;          // e.g., "English"
  specificWordsOrFeatures: string;
  specificWordsNotToUse: string;
  projectGoal: string;
};

interface TCharacteristicInfo {
  gender: string; 
  ageRange: string; 
  creatorLocation: string;  
  anySpecialRequest: string;
  targetAudience: string;   
  targetAudienceAgeGroup: string;
  productSolveForThem: string; 
  topPerformingAdsLast30Days: string;
};


interface AddOns{
  isExtraHook: string;
  isExtraCta: string;
  isRowFootagePerConcept: string;
  isOffSiteFilming: string;
  isUgc5Photos: string;      // e.g., "5" (keep as string to match your JSON)
  isExpressDelivery: string;
  isFilmingEssentials: string;
  isAdditionalPerson: string;
};




export interface TOrdersData {
  _id: string;
  userId: TUserProfile;
  subscriptionId: TSubscription;
  brandInfo: TBrandInfo;
  brandSocial: TBrandSocial;
  videoInfo: TVideoInfo;
  characteristicInfo: TCharacteristicInfo;
  addOns: AddOns;
  status: string;
  creatorPrice?: string;
  brandPrice?: string;
  paymentStatus: string;
  takeVideoCount: number;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}
