import { NextRequest } from "next/server";
import { proxyToBackend } from "@/app/utils/proxy";

export function GET(req: NextRequest) {
  return proxyToBackend(req, "/v1/programs");
}

export function POST(req: NextRequest) {
  return proxyToBackend(req, "/v1/programs/");
}
