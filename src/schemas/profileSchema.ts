import * as z from "zod";

export const creatorProfileFormSchema = z.object({
  profile: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Please upload a valid image file"
    ),
  accountHolderName: z.string(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  //-----------------------------//
  phone: z.string(),
  dateOfBirth: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  postalCode: z.string(),
  street: z.string(),
  houseBuildingNo: z.string(),
  //----------------------------//
  niche: z.string(),
  language: z.string(),
  profession: z.string(),
  //--------------------------//
  gender: z.string(),
  ethnicity: z.string(),
  bodyType: z.string(),
  hairType: z.string(),
  skinType: z.string(),
  //--------------------------//
  tiktokHandle: z.string(),
  tiktokLink: z.string(),
  instragramHandle: z.string(),
  instragramLink: z.string(),
  othersSocialLink: z.string(),
  portfolioLink: z.string(),
  //--------------------------//
  ugcExampleVideo: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        (Array.isArray(files) &&
          files.length <= 6 &&
          files.every((file) => file instanceof File && file.type.startsWith("video/"))),
      "Please upload up to 6 valid video files"
    ),
  introductionvideo: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("video/")),
      "Please upload a valid video file"
    ),
});