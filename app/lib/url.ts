export async function resolveUrlToken(token: string) {
  const res = await fetch(
    `/api/s/${token}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return data;
}
