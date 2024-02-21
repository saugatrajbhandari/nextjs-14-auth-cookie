"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Logout = ({ token }: { token: string | undefined }) => {
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    const response = await fetch("/api/auth", {
      method: "Delete",
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
