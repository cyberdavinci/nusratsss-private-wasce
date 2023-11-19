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
  title: "Academia Portal",
  description: "Registration portal",
};

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark bg-[#0d0a0b]">
      <body className={inter.className}>
        <ContextProvider>
          <AuthProvider>
            <ReduxProvider>
              <UIProvider>
                <div className=" relative w-full min-h-screen  flex gap-8 justify-between">
                  <Sidebar />

                  {/* </Sidebar> */}

                  <div className="flex-1 h-screen ">{children}</div>
                </div>
              </UIProvider>
            </ReduxProvider>
          </AuthProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
