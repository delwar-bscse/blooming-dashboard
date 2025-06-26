

import { authBackground } from "@/assets/assets";
import ForgotPassword from "@/components/form/authForm/ForgotPassword";

export default function CreatorSignup() {

  return (
      <div className="bg-blue-100 h-screen box-border overflow-hidden bg-cover bg-no-repeat" style={{ backgroundImage: `url(${authBackground.src})` }} >
        <div className="h-full overflow-y-auto">
          <ForgotPassword />
        </div>
      </div>
  );
}
