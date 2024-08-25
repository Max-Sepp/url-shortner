import { getBaseUrl } from "@/lib/utils";

export async function shorten(url: { url: string }): Promise<{ code: string }> {
  const response = await fetch(getBaseUrl() + "api/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(url),
  });

  return await response.json();
}
