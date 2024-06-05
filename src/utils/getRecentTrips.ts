export const getRecentTrips = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DEV_BACKEND_URL}/trip?page=1&limit=8`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recent trips");
  }

  return res.json();
};
