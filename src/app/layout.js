import "./globals.css";
import { Inter } from "next/font/google";

import Sidebar from "@/components/sidebar/Sidebar";
// import { SideBarItem } from "@/components/sidebar/Sidebar";
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
                  <Sidebar />

                  {/* </Sidebar> */}

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
