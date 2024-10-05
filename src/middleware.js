// import { NextResponse } from "next/server";
// import { authOptions } from "./app/api/auth/[...nextauth]/route";
// wanted to use getServerSession with authOptions to protect api endpoints

export { default } from "next-auth/middleware";

export const config = { matcher: ["/api/others/:path*"] };
