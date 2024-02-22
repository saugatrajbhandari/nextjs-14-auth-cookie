"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

const Logout = ({ token }: { token: string | undefined }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch("/api/auth", {
      method: "DELETE",
    });

    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <>
      {token && (
        <Button onClick={handleDelete} variant="destructive">
          logout
        </Button>
      )}
    </>
  );
};

export default Logout;
