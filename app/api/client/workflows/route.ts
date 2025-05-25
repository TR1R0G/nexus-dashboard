import { supabaseService } from "@/src/utils/supabase/service";
import { NextResponse } from "next/server";

const CLIENT_ID = "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"; // demo id

export async function GET() {
  const { data, error } = await supabaseService().rpc(
    "get_client_workflows", // parametric function
    { p_client: CLIENT_ID }
  );

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data ?? []);
}
