import { NextRequest } from "next/server";
import { supabase } from "../../server/supabase-client";

export async function getAddresses() {
  let { data: addresses, error } = await supabase.from("Addresses").select("*");

  return { addresses, error };
}
