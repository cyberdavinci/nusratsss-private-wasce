import "./globals.css";
import { Inter } from "next/font/google";

import Sidebar from "@/components/sidebar/Sidebar";
import { SideBarItem } from "@/components/sidebar/Sidebar";
import AuthProvider from "@/authProvider/AuthProvider";
import { ReduxProvider } from "@/redux/features/provider";
import UIProvider from "../components/NextUiProvider/UIProvider";
import { ContextProvider } from "@/context/ContextProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tokenz",
  description: "Registration by token",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  // console.log(session.user);
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
        <ContextProvider>
          <AuthProvider>
            <ReduxProvider>
              <UIProvider>
                <div className=" relative w-full min-h-screen dark flex gap-8 justify-between ">
                  {session ? (
                    <Sidebar>
                      {session.user.role === "admin" ? (
                        <>
                          <SideBarItem
                            text={"Dashboard"}
                            // icon={<RxDashboard size={25} />}
                            icon={"/icons/sidebar/dashboard.svg"}
                            active={true}
                            link={"/dashboard"}
                            routeType={"admin"}
                          />
                          <SideBarItem
                            text={"Tokens"}
                            // icon={<AiOutlineKey size={25} />}
                            icon={"/icons/sidebar/token.svg"}
                            link={"/dashboard/tokens"}
                            routeType={"admin"}
                          />
                          <SideBarItem
                            text={"Students"}
                            // icon={<PiStudentDuotone size={25} />}
                            icon={"/icons/sidebar/students.svg"}
                            link={"/dashboard/students"}
                            routeType={"admin"}
                          />

                          <SideBarItem
                            text={"Settings"}
                            // icon={<AiOutlineSetting size={25} />}
                            icon={"/icons/sidebar/settings.svg"}
                            link={"/dashboard/settings"}
                            routeType={"admin"}
                          />
                        </>
                      ) : null}

                      <SideBarItem
                        text={"Account"}
                        // icon={<BiUserCircle size={25} />}
                        icon={"/icons/sidebar/user.svg"}
                        link={"/dashboard/account"}
                        routeType={"student"}
                      />
                    </Sidebar>
                  ) : null}

                  <div className="flex-1   w-full md:ml-[85px] p-4">
                    {children}
                  </div>
                </div>
              </UIProvider>
            </ReduxProvider>
          </AuthProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
