
import { authBackground } from "@/assets/assets";

export default function BrandFormLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-blue-100 h-screen box-border overflow-hidden bg-cover bg-no-repeat flex justify-center items-center" style={{ backgroundImage: `url(${authBackground.src})` }} >
      <div className="w-full max-w-[700px]">
        {children}
      </div>
    </div>
  );
}
