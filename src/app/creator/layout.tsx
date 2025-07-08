import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { creatorMenu } from "@/constant/sidebarData";

export default function CreatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <header className="bg-[#FFFFFF] px-12 sticky top-0">
        <Header />
      </header>
      <main className="bg-[#F1F1F1] flex" style={{ height: "calc(100vh - 92px)" }}>
        <section className="bg-[#E9EDF2] w-[280px] mx-4">
          <Sidebar menu={creatorMenu}/>
        </section>
        <section className="flex-1 pr-4 overflow-y-auto">
            {children}
        </section>
      </main>
    </div>
  );
}
