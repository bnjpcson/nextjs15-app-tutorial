import { BlogPostCard } from "@/components/general/BlogPostCard";
import { prisma } from "./utils/db";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const revalidate = 3600;

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      authorId: true,
      id: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return data;
}

export default function Home() {
  return (
    <main>
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Latest Posts</h1>
      </div>

      <Suspense fallback={<BlogPostGrid />}>
        <BlogPosts />
      </Suspense>
    </main>
  );
}

async function BlogPosts() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const data = await getData();

  return (
    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  );
}

function BlogPostGrid() {
  return (
    <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm h-[400px] flex flex-col overflow-hidden"
            key={index}
          >
            <Skeleton className="h-48 w-full rounded-none" />

            <div className="p-4 flex-1 flex flex-col gap-3">
              <Skeleton className="h-6 w-3/4" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>

              <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full mr-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
