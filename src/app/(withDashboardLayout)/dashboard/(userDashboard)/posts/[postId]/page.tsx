import EditTrip from '@/components/Shared/Post/EditTrip';

type TParams = {
  params: {
    postId: string;
  };
};

const PostPage = ({ params }: TParams) => {
  const id = params?.postId;

  return <EditTrip id={id} />;
};

export default PostPage;
