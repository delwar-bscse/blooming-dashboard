
export const formatImagePath = (path: string) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  } else {
    if (path.startsWith("/")) {
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}${path}`;
    } else {
      return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path}`;
    }
  }
};