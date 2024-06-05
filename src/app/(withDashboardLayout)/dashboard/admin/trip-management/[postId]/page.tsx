import EditPost from "@/components/Shared/Post/EditPost";

type TParams = {
  params: {
    postId: string;
  };
};

const PostPage = ({ params }: TParams) => {
  const id = params?.postId;
  return <EditPost id={id} />;
};

export default PostPage;
