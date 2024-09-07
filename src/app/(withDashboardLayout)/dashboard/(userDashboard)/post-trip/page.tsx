'use client';

import EditOrPostTrip from '@/components/Shared/EditORPostTripForm/EditORPostTripForm';
import { useCreateTripMutation } from '@/redux/api/tripApi';
import { FieldValues } from 'react-hook-form';

function PostTripPage() {
  const [createTrip, { isLoading }] = useCreateTripMutation();

  const handlePostSubmit = async (values: FieldValues) => {
    return createTrip(values).unwrap();
  };

  return (
    <EditOrPostTrip
      onSubmit={handlePostSubmit}
      isLoading={isLoading}
      mode="post"
    />
  );
}

export default PostTripPage;
