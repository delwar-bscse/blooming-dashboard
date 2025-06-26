 import { overviewImg, blogPostImg, brandsImg, changePasswordImg, contactSupportImg, creatorsImg, messageImg, packageImg, privacyPolicyImg, profileImg, subscriptionImg, termsConditionImg, uploadImg } from "@/assets/assets";
import { menuType } from "@/type/type";


export const adminMenu: menuType[] = [
  {
    id: 1,
    icon: overviewImg,
    title: "Overview",
    label: "/admin",
  },
  {
    id: 2,
    icon: creatorsImg,
    title: "All Creator",
    label: "/admin/all-creators",
  },
  {
    id: 3,
    icon: brandsImg,
    title: "All Orders",
    label: "/admin/all-orders",
  },
  {
    id: 4,
    icon: packageImg,
    title: "Package",
    label: "/admin/packages",
  },
  {
    id: 5,
    icon: subscriptionImg,
    title: "Subscription",
    label: "/admin/subscriptions",
  },
  {
    id: 6,
    icon: uploadImg,
    title: "Upload Video",
    label: "/admin/upload-video",
  },
  {
    id: 7,
    icon: blogPostImg,
    title: "Blog Post",
    label: "/admin/blog-post",
  },
  {
    id: 8,
    icon: contactSupportImg,
    title: "Contact & Support",
    label: "/admin/contact-support",
  },
  {
    id: 9,
    icon: messageImg,
    title: "Message",
    label: "/admin/message",
  },
  {
    id: 10,
    icon: changePasswordImg,
    title: "Change Password",
    label: "/admin/change-password",
  },
  {
    id: 11,
    icon: privacyPolicyImg,
    title: "Privacy Policy",
    label: "/admin/privacy-policy",
  },
  {
    id: 12,
    icon: termsConditionImg,
    title: "Terms & Condition",
    label: "/admin/terms-and-condition",
  }
];

export const creatorMenu: menuType[] = [
  {
    id: 1,
    icon: creatorsImg,
    title: "All Projects",
    label: "/creator/all-project",
  },
  {
    id: 2,
    icon: profileImg,
    title: "Profile",
    label: "/creator/profile",
  },
  {
    id: 3,
    icon: changePasswordImg,
    title: "Change Password",
    label: "/creator/change-password",
  },
  {
    id: 4,
    icon: privacyPolicyImg,
    title: "Privacy Policy",
    label: "/creator/privacy-policy",
  },
  {
    id: 5,
    icon: termsConditionImg,
    title: "Terms & Condition",
    label: "/creator/terms-condition",
  },
  {
    id: 6,
    icon: messageImg,
    title: "Message",
    label: "/creator/message",
  }
];