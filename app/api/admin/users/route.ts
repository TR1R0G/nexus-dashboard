// app/api/admin/users/route.ts
import { supabaseService } from "@/src/utils/supabase/service";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseService().rpc("admin_users");
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  // 1. Create user in Supabase Auth if not exists
  // (You may want to check if the user already exists by email)
  const { data: user, error: authError } =
    await supabaseService().auth.admin.createUser({
      email: body.p_email,
      password: "password",
      email_confirm: true,
    });

  if (authError)
    return NextResponse.json({ error: authError }, { status: 500 });

  // 2. Use the new user's ID for the upsert
  const { error } = await supabaseService().rpc("admin_upsert_user", {
    ...body,
    p_id: user.user.id,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  const { error } = await supabaseService().rpc("admin_delete_user", {
    p_id: id,
  });
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
