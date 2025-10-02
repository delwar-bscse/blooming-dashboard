 import { overviewImg, blogPostImg, brandsImg, changePasswordImg, contactSupportImg, creatorsImg, messageImg, packageImg, privacyPolicyImg, profileImg, subscriptionImg, termsConditionImg, uploadImg } from "@/assets/assets";
import { menuType } from "@/type/type";


export const adminMenu: menuType[] = [
  {
    icon: overviewImg,
    title: "Overview",
    label: "/admin",
  },
  {
    icon: creatorsImg,
    title: "All Users",
    label: "/admin/all-users",
  },
  {
    icon: creatorsImg,
    title: "All Creator",
    label: "/admin/all-creators",
  },
  {
    icon: brandsImg,
    title: "All Orders",
    label: "/admin/all-orders",
  },
  {
    icon: packageImg,
    title: "Package",
    label: "/admin/packages",
  },
  {
    icon: subscriptionImg,
    title: "Subscription",
    label: "/admin/subscriptions",
  },
  {
    icon: uploadImg,
    title: "Upload Video",
    label: "/admin/upload-video",
  },
  {
    icon: blogPostImg,
    title: "Blog Post",
    label: "/admin/blog-post",
  },
  {
    icon: blogPostImg,
    title: "They Bloom",
    label: "/admin/they-bloom",
  },
  {
    icon: contactSupportImg,
    title: "Contact & Support",
    label: "/admin/contact-support",
  },
  {
    icon: messageImg,
    title: "Message",
    label: "/admin/message",
  },
  {
    icon: changePasswordImg,
    title: "Change Password",
    label: "/admin/change-password",
  },
  {
    icon: privacyPolicyImg,
    title: "Privacy Policy",
    label: "/admin/privacy-policy",
  },
  {
    icon: termsConditionImg,
    title: "Terms & Condition",
    label: "/admin/terms-and-condition",
  }
];

export const creatorMenu: menuType[] = [
  {
    icon: creatorsImg,
    title: "All Projects",
    label: "/creator/all-project",
  },
  {
    icon: creatorsImg,
    title: "Order Request",
    label: "/creator/order-request",
  },
  {
    icon: profileImg,
    title: "Profile",
    label: "/creator/profile",
  },
  {
    icon: changePasswordImg,
    title: "Change Password",
    label: "/creator/change-password",
  },
  {
    icon: privacyPolicyImg,
    title: "Privacy Policy",
    label: "/creator/privacy-policy",
  },
  {
    icon: termsConditionImg,
    title: "Terms & Condition",
    label: "/creator/terms-condition",
  },
  {
    icon: messageImg,
    title: "Message",
    label: "/creator/message",
  }
];