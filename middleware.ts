import { NextResponse } from 'next/server';
import { clerkMiddleware } from "@clerk/nextjs/server";

// Define public routes (including root and /api/webhook/clerk)
const publicRoutes = ['/', '/api/webhook/clerk'];

// Define ignored routes (e.g., /api/webhook/clerk)
const ignoredRoutes = ['/api/webhook/clerk'];

// Custom middleware function
export default function middleware(req: any, event: any) {
  const url = req.nextUrl;

  // Check if the request URL is in the ignored routes
  if (ignoredRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  // Check if the request URL is in the public routes
  if (publicRoutes.some(route => new RegExp(route).test(url.pathname))) {
    return NextResponse.next();
  }

  // Apply Clerk middleware for other routes
  return clerkMiddleware()(req, event);
}

// Configuration for middleware matcher
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

