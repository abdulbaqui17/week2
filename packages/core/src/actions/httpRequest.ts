import fetch from "node-fetch";
export async function httpRequest(config: any, input: any) {
  const { url, method = "GET", headers = {}, body } = config ?? {};
  if (!url) throw new Error("http_request: missing url");
  const res = await fetch(url, {
    method,
    headers,
    body,
  });
  const text = await res.text();
  let parsed: any = text;
  try { parsed = JSON.parse(text); } catch {}
  return { ok: res.ok, status: res.status, body: parsed, headers: Object.fromEntries(res.headers as any) };
}
