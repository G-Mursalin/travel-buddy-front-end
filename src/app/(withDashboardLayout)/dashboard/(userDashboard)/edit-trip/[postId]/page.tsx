'use client';

import { useGetTripQuery, useUpdateTripMutation } from '@/redux/api/tripApi';
import Spinner from '@/components/Shared/Spinner/Spinner';
import EditOrPostTrip from '@/components/Shared/EditORPostTripForm/EditORPostTripForm';
import { FieldValues } from 'react-hook-form';

type TParams = {
  params: {
    postId: string;
  };
};

function EditTripPage({ params }: TParams) {
  const { data, isLoading, isFetching } = useGetTripQuery(params?.postId);
  const [updateTrip, { isLoading: isUpdating }] = useUpdateTripMutation();

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  const trip = data?.data;

  if (!trip) {
    return <p>No trip details found.</p>;
  }

  const handleEditSubmit = async (values: FieldValues) => {
    updateTrip({ id: trip._id, data: values }).unwrap();
  };

  return (
    <EditOrPostTrip
      initialData={trip}
      onSubmit={handleEditSubmit}
      isLoading={isUpdating}
      mode="edit"
    />
  );
}

export default EditTripPage;
