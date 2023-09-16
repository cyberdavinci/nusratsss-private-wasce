import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navBar/navBar";
import Footer from "@/components/footer/footer";
import AuthProvider from "@/authProvider/AuthProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tokenz",
  description: "Registration by token",
};

export default function RootLayout({ children }) {
  const session = getServerSession();
  // if (!session) {
  //   redirect("/login?callback=/");
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="max-w-[1336px] min-h-screen m-[0 auto] py-0 px-[60px] flex flex-col justify-between">
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
