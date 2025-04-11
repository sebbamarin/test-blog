import { API_HOST, API_TOKEN } from "astro:env/server";
import type { Post } from "@/types";

export const getPosts = async () => {
  const url = new URL(`${API_HOST}/api/posts`);

  const query = {
    sort: "date:desc",
    "fields[0]": "title",
    "fields[1]": "slug",
    "fields[2]": "description",
    "fields[3]": "date",
    "populate[image][fields][0]": "url",
  };

  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) throw new Error("Error fetching data");

    const result = await response.json();

    const data = result.data as Post[];

    const posts = data.map((post) => ({
      ...post,
      image: post.image ? { url: `${API_HOST}${post.image?.url}` } : null,
    }));

    return posts;
  } catch (error) {
    console.log(error);

    return [];
  }
};
