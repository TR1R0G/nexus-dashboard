import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { updateSession } from "./src/utils/supabase/middleware";

export async function middleware(req: any) {
  // 1️⃣  Keep Supabase session <-> cookie in sync
  const res = await updateSession(req);

  // 2️⃣  Supabase client with the NEW cookie adapter
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies
            .getAll()
            .map((cookie: { name: string; value: string }) => ({
              name: cookie.name,
              value: cookie.value,
            }));
        },
        setAll(cookies: { name: string; value: string; options?: any }[]) {
          cookies.forEach(
            (cookie: { name: string; value: string; options?: any }) =>
              res.cookies.set(cookie.name, cookie.value, cookie.options)
          );
        },
      },
    }
  );

  // 3️⃣  Fetch role in one round-trip
  const { data, error } = await supabase.rpc("get_current_role");

  if (error) console.error("get_current_role error", error);

  const role = data as "ADMIN" | "SE" | "CLIENT" | null;

  // 4️⃣  Redirect rules
  const path = req.nextUrl.pathname;

  if (path.startsWith("/admin") && role !== "ADMIN" && role !== "SE")
    return NextResponse.redirect(new URL("/client", req.url));

  if (path.startsWith("/client") && (role === "ADMIN" || role === "SE"))
    return NextResponse.redirect(new URL("/admin", req.url));

  const needsAuth = path.startsWith("/admin") || path.startsWith("/client");
  if (needsAuth && !role)
    return NextResponse.redirect(new URL("/auth/signin", req.url));

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
