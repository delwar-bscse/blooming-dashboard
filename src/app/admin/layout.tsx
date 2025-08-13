import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { adminMenu } from "@/constant/sidebarData";
import { PriceProvider } from "@/contexts/PriceContext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PriceProvider>
      <div className="h-screen">
        <header className="bg-[#FFFFFF] px-12 sticky top-0">
          <Header />
        </header>
        <main className="bg-[#F1F1F1] flex" style={{ height: "calc(100vh - 92px)" }}>
          <section className="bg-[#E9EDF2] w-[280px] mx-4 pb-8 h-full overflow-y-auto">
            <Sidebar menu={adminMenu} />
          </section>
          <section className="flex-1 pr-4 overflow-hidden">
            <div className="h-full overflow-y-auto hide-scrollbar">
              {children}
            </div>
          </section>
        </main>
      </div>
    </PriceProvider>
  );
}
