import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { updateSession } from "./src/utils/supabase/middleware"; // keep

export async function middleware(req: any) {
  // 1️⃣ keep session in sync
  const res = await updateSession(req);

  // 2️⃣ read current user
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: req.cookies } // simple cookie adapter
  );
  const { data } = await supabase.auth.getUser();
  const role = data.user?.user_metadata?.role;

  // 3️⃣ redirects
  const path = req.nextUrl.pathname;
  if (path.startsWith("/admin") && role !== "ADMIN" && role !== "SE")
    return NextResponse.redirect(new URL("/client", req.url));

  if (path.startsWith("/client") && (role === "ADMIN" || role === "SE"))
    return NextResponse.redirect(new URL("/admin", req.url));

  const protectedPath = path.startsWith("/admin") || path.startsWith("/client");
  if (protectedPath && !role)
    return NextResponse.redirect(new URL("/auth/signin", req.url));

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
