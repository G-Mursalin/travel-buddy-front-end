const getRecentTrips = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/trip?page=1&limit=8`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch recent trips');
  }

  return res.json();
};

const getTrips = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/trip`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch trips');
  }

  return res.json();
};

export const tripApi = { getRecentTrips, getTrips };
