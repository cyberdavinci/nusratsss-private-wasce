import "./globals.css";
import { Inter } from "next/font/google";

import Sidebar from "@/components/sidebar/Sidebar";
import { SideBarItem } from "@/components/sidebar/Sidebar";
import AuthProvider from "@/authProvider/AuthProvider";
import { ReduxProvider } from "@/redux/features/provider";
import UIProvider from "../components/NextUiProvider/UIProvider";
import { RxDashboard } from "react-icons/rx";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineSetting, AiOutlineKey } from "react-icons/ai";
import { PiStudentDuotone } from "react-icons/pi";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tokenz",
  description: "Registration by token",
};

export default function RootLayout({ children }) {
  const adminRoutes = [
    {
      name: "",
      icon: "",
      link: "",
    },
  ];
  const userRoutes = [
    {
      name: "",
      icon: "",
      link: "",
    },
  ];
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>
            <UIProvider>
              <div className=" relative w-full min-h-screen dark flex gap-2 justify-between ">
                <Sidebar>
                  <SideBarItem
                    text={"Dashboard"}
                    // icon={<RxDashboard size={25} />}
                    icon={"/icons/sidebar/dashboard.svg"}
                    active={true}
                    link={"/dashboard"}
                  />
                  <SideBarItem
                    text={"Tokens"}
                    // icon={<AiOutlineKey size={25} />}
                    icon={"/icons/sidebar/token.svg"}
                    link={"/tokens"}
                  />
                  <SideBarItem
                    text={"Students"}
                    // icon={<PiStudentDuotone size={25} />}
                    icon={"/icons/sidebar/student.svg"}
                    link={"/students"}
                  />
                  <SideBarItem
                    text={"Account"}
                    // icon={<BiUserCircle size={25} />}
                    icon={"/icons/sidebar/account.svg"}
                    link={"/account"}
                  />
                  <SideBarItem
                    text={"Settings"}
                    // icon={<AiOutlineSetting size={25} />}
                    icon={"/icons/sidebar/settings.svg"}
                    link={"/settings"}
                  />
                </Sidebar>
                <div className="flex-1 w-[85%] ml-[85px]">{children}</div>
              </div>
            </UIProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
