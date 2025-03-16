import "./globals.css";
import { Inter } from "next/font/google";

import Sidebar from "@/components/sidebar/Sidebar";
// import { SideBarItem } from "@/components/sidebar/Sidebar";
import AuthProvider from "@/authProvider/AuthProvider";
import { ReduxProvider } from "@/redux/features/provider";
import UIProvider from "../components/NextUiProvider/UIProvider";
import { ContextProvider } from "@/context/ContextProvider";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Academia Portal - Nusrat Private Wassce Studies",
  description: "Registration Portal for Nusrat Private Wascce Studies",
};

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ContextProvider>
          <AuthProvider>
            <ReduxProvider>
              <UIProvider>
                <div className=" relative w-full min-h-screen h-full flex gap-8 justify-between bg-dark-custom-gradient">
                  <Sidebar />

                  {/* </Sidebar> */}

                  <div className="flex-1 min-h-screen  w-full md:mx-auto float-right">
                    {children}
                  </div>
                </div>
              </UIProvider>
            </ReduxProvider>
          </AuthProvider>
        </ContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
