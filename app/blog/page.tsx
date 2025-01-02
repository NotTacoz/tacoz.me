import { notFound } from "next/navigation";
import Post from "../[...slug]/page";

export default function BlogPost({ params }: { params: { slug?: string[] } }) {
  if (!params.slug) {
    params.slug = ["blog"];
  }
  return <Post params={params} />;
}
