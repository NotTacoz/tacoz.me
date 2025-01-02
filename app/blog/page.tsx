// Start of Selection
import Post from "../[...slug]/page";

export default function BlogPost({ params }: { params: { slug?: string[] } }) {
  if (!params.slug) {
    params.slug = ["blog"];
  }
  return <Post params={Promise.resolve(params as { slug: string[] })} />;
}
