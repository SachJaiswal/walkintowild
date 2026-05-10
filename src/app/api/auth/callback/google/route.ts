import { NextResponse } from "next/server";

export function GET(request: Request) {
  const url = new URL(request.url);
  const redirectUrl = new URL("/login", url.origin);
  const error = url.searchParams.get("error");

  if (error) {
    redirectUrl.searchParams.set(
      "error",
      "Google sign-in was cancelled or blocked. Please try again.",
    );
  }

  return NextResponse.redirect(redirectUrl);
}
