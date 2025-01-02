// Start of Selection
import Post from "../[...slug]/page";

interface BlogPostProps {
  params: {
    slug?: string[];
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const slug = params.slug || ["blog"];
  return <Post params={{ slug }} />;
}
