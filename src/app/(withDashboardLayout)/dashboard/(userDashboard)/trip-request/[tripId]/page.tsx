"use client";

type TParams = {
  params: {
    tripId: string;
  };
};

const TripRequestPage = ({ params }: TParams) => {
  const id = params?.tripId;
  return <div>TripRequestPage {id}</div>;
};

export default TripRequestPage;
