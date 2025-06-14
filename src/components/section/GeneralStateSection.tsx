import { FaUsers } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { LiaLayerGroupSolid } from "react-icons/lia";
import { GoPlusCircle } from "react-icons/go";
import { TbReportMoney } from "react-icons/tb";
import { PiUsersThree } from "react-icons/pi";


const GeneralStateSection = () => {
  // Simulated dummy data
  const generalState = {
    data: {
      totalCreators: {
        creator: 530,
        download: "04%"
      },
      totalBrands: {
        brand: 5360,
        active: "60%"
      },
      totalProjects: {
        project: 1220,
        add: "10%"
      },
      totalRevenue: {
        revenue: 6660.65,
        revenueToday: "10%"
      },
      totalSubscription: {
        subscription: 1320,
        subscribe: "9%"
      },
    },
  };

  const isLoading = false; // Simulated loading state

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        {/* <img src={salongoLogo} alt="" /> */}
      </div>
    );
  }

  const state = generalState?.data;

  return (
    <div className="grid md:grid-cols-5 gap-3">
      <div className="bg-white rounded-xl py-4 ps-3 flex gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <PiUsersThree className="text-gray-500" size={20} />
        </div>
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-center text-2xl font-semibold text-gray-500">Total Creator</h2>
          <h3 className="text-center text-2xl font-bold text-gray-600">
            {state?.totalCreators?.creator}
          </h3>
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <span className="p-1 bg-gray-100 rounded-full">
              <MdOutlineFileDownload />
            </span>
            <span>{state?.totalCreators?.download} Download Today</span>
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl py-4 ps-3 flex gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <PiUsersThree className="text-gray-500" size={20} />
        </div>
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-center text-2xl font-semibold text-gray-500">Total Brand</h2>
          <h3 className="text-center text-2xl font-bold text-gray-600">
            {state?.totalBrands?.brand}
          </h3>
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <span className="p-1 bg-gray-100 rounded-full">
              <IoCheckmarkCircleOutline />
            </span>
            <span>{state?.totalBrands?.active} Active Today</span>
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl py-4 ps-3 flex gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <LiaLayerGroupSolid className="text-gray-500" size={20} />
        </div>
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-center text-2xl font-semibold text-gray-500">Total Project</h2>
          <h3 className="text-center text-2xl font-bold text-gray-600">
            {state?.totalProjects?.project}
          </h3>
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <span className="p-1 bg-gray-100 rounded-full">
              <GoPlusCircle />
            </span>
            <span>{state?.totalProjects?.add} Add Today</span>
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl py-4 ps-3 flex gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <TbReportMoney className="text-gray-500" size={20} />
        </div>
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-center text-2xl font-semibold text-gray-500">Total Revenue</h2>
          <h3 className="text-center text-2xl font-bold text-gray-600">
            ${state?.totalRevenue?.revenue}k
          </h3>
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <span className="p-1 bg-gray-100 rounded-full">
              <GiReceiveMoney />
            </span>
            <span>{state?.totalRevenue?.revenueToday} Revenue Today</span>
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl py-4 ps-3 flex gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <PiUsersThree className="text-gray-500" size={20} />
        </div>
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-center text-2xl font-semibold text-gray-500">Total Subscription</h2>
          <h3 className="text-center text-2xl font-bold text-gray-600">
            {state?.totalCreators?.creator}
          </h3>
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <span className="p-1 bg-gray-100 rounded-full">
              <FaUsers />
            </span>
            <span>{state?.totalCreators?.download} Subscribes Today</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralStateSection;
