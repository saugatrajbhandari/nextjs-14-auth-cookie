import { cookies } from "next/headers";
import Logout from "./auth/logout";

const Navbar = () => {
  const userData = JSON.parse(cookies().get("user")?.value || "{}");
  const token = cookies().get("token")?.value;

  return (
    <nav className="flex justify-between p-8 bg-purple-800 text-white">
      {userData && <p>{userData.email}</p>}
      <Logout token={token} />
    </nav>
  );
};

export default Navbar;
