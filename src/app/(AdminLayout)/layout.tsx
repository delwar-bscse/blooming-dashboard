import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-[#FFFFFF] px-12">
        <Header />
      </header>
      <main className="bg-[#F1F1F1] flex-1 flex">
        <section className="bg-[#E9EDF2] w-[280px] mx-4">
          <Sidebar />
        </section>
        <section className="flex-1 pr-4">
          {children}
        </section>
      </main>
    </div>
  );
}
