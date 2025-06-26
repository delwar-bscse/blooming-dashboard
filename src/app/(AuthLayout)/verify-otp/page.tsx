

import { authBackground } from "@/assets/assets";
import VerifyOtp from "@/components/form/authForm/VerifyOtp";

export default function CreatorSignup() {

  return (
      <div className="bg-blue-100 h-screen box-border overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url(${authBackground.src})` }} >
        <div className="h-full overflow-y-auto">
          <VerifyOtp />
        </div>
      </div>
  );
}
