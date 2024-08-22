import { TQuery } from '@/app/(withCommonLayout)/all-trip/page';

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

const getTrips = async (query: TQuery) => {
  const searchParams = new URLSearchParams();

  // Add query parameters to searchParams
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  const queryString = searchParams.toString();
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/trip${
    queryString ? `?${queryString}` : ''
  }`;

  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch trips');
  }

  return res.json();
};

export const tripApi = { getRecentTrips, getTrips };
