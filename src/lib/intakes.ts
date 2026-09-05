import { getSupabaseAdmin } from "./supabase-admin";

// Private AI setup intakes, stored in Supabase (public.intakes). This used to
// write a JSON file under process.cwd(), which silently lost every submission
// on Vercel's read-only filesystem.

export interface IntakeData {
  id: string;
  sessionId: string;
  email: string;
  name: string;
  setupType: "local" | "vps" | "cloud" | "managed";
  operatingSystem: string;
  specs: string;
  useCases: string;
  // VPS-specific fields
  domainPreference?: string;
  modelSizePreference?: "small" | "medium" | "large";
  // Metadata
  timestamp: string;
  status: "pending" | "pending_call" | "scheduled" | "completed";
}

// public.intakes is snake_case; the app has always spoken camelCase.
type IntakeRow = {
  id: string;
  session_id: string;
  email: string;
  name: string;
  setup_type: IntakeData["setupType"];
  operating_system: string;
  specs: string;
  use_cases: string;
  domain_preference: string | null;
  model_size_preference: IntakeData["modelSizePreference"] | null;
  status: IntakeData["status"];
  created_at: string;
};

function toIntakeData(row: IntakeRow): IntakeData {
  return {
    id: row.id,
    sessionId: row.session_id,
    email: row.email,
    name: row.name,
    setupType: row.setup_type,
    operatingSystem: row.operating_system,
    specs: row.specs,
    useCases: row.use_cases,
    ...(row.domain_preference ? { domainPreference: row.domain_preference } : {}),
    ...(row.model_size_preference
      ? { modelSizePreference: row.model_size_preference }
      : {}),
    timestamp: row.created_at,
    status: row.status,
  };
}

export async function addIntake(
  intake: Omit<IntakeData, "id" | "timestamp" | "status">,
  status: IntakeData["status"] = "pending"
): Promise<IntakeData> {
  const { data, error } = await getSupabaseAdmin()
    .from("intakes")
    .insert({
      session_id: intake.sessionId ?? "",
      email: intake.email ?? "",
      name: intake.name ?? "",
      setup_type: intake.setupType,
      operating_system: intake.operatingSystem ?? "",
      specs: intake.specs ?? "",
      use_cases: intake.useCases ?? "",
      domain_preference: intake.domainPreference ?? null,
      model_size_preference: intake.modelSizePreference ?? null,
      status,
    })
    .select()
    .single();

  if (error) throw new Error(`Failed to store intake: ${error.message}`);
  return toIntakeData(data as IntakeRow);
}

export async function getRecentIntakes(limit: number = 50): Promise<IntakeData[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("intakes")
    .select()
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to read intakes: ${error.message}`);
  return (data as IntakeRow[]).map(toIntakeData);
}
