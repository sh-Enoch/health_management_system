import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:8000";

export async function proxyToBackend(
  req: NextRequest,
  path: string,
  options: { method?: string } = {},
) {
  const url = `${BACKEND_API_URL}/api/${path.replace(/^\/+/, "")}`;
  const method = options.method || req.method;

  //   forward important headers
  const headers = new Headers();

  //   forward cookies for authentication
  const cookie = req.headers.get("Cookie");
  if (cookie) headers.set("Cookie", cookie);

  //   forward the content
  const contentType = req.headers.get("Content-Type");
  if (contentType) headers.set("Content-Type", contentType);

  //   forward auth header
  //   const auth = req.headers.get("Authorization");
  //   if (auth) headers.set("Authorization", auth);

  try {
    const resp = await fetch(url, {
      method,
      headers,
      body:
        method !== "GET" && method !== "HEAD" ? await req.text() : undefined,
    });
    const data = await resp.text();

    return new NextResponse(data, {
      status: resp.status,
      statusText: resp.statusText,
      headers: {
        "Content-Type": resp.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    console.error(`Proxy error for ${url}:`, error);
    return NextResponse.json(
      { error: "Backend Unvailable or sth!!" },
      { status: 502 },
    );
  }
}
