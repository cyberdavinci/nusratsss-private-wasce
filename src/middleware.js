import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// Check if it's in production mode
const isProduction = process.env.NODE_ENV === "production";

export default async function middleware(req) {
  if (isProduction) {
    // Apply the next-auth middleware only in production
    // need to look more into withAuth
    return withAuth(req);
  }

  // In development, bypass the auth middleware and allow the API route
  return NextResponse.next();
}

// Add matcher configuration
export const config = {
  matcher: ["/api/others/:path*"],
};
