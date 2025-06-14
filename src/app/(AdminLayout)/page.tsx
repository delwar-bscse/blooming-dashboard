import GeneralStateSection from "@/components/section/GeneralStateSection"
import SubscriptionGraph from "@/components/section/SubcriptionGraph"
import SalesTrackingChart from "@/components/section/SalesTrackingChart"
import TotalRevenue from "@/components/section/TotalRevenue";

export default function Home() {

  return (
    <div>
      <div className="pt-4">
        <GeneralStateSection />
      </div>
      <div className="md:flex w-full items-center gap-6 mt-6 pb-4">
        <div className="md:w-8/12 bg-white rounded-2xl py-3 flex flex-col justify-center">
          <SalesTrackingChart />
        </div>
        <div className="md:w-4/12">
          <TotalRevenue />
        </div>
      </div>
      <div>
        <SubscriptionGraph />
      </div>
    </div>
  )
}