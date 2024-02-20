import UserPosts from "@/app/components/UserPosts";
import UserProfile from "@/app/components/UserProfile";
import { getUserForProfile, getUserListTest } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache } from "react";

type Props = {
  params: { username: string };
};

const getUser = cache(async (username: string) => getUserForProfile(username));

const getUserList = cache(async (username: string) =>
  getUserListTest(username)
);

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);
  const userTest = await getUserList(username);
  console.log("userTest", userTest);
  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) ‧ Instantgram Photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}
