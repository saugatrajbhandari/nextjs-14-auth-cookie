"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

function LoginForm() {
  const [user, setUser] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        user,
        token: (Math.random() * 1000000).toFixed(),
      }),
    });

    router.refresh();
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-8">
      <div className="flex gap-4 items-center">
        <label htmlFor="">Email:</label>
        <Input
          type="email"
          value={user.email}
          onChange={(e) =>
            setUser((prevState) => ({ ...prevState, email: e.target.value }))
          }
          placeholder="Enter email"
        />
      </div>
      <div className="flex gap-4 items-center">
        <label htmlFor="">Password:</label>
        <Input
          value={user.password}
          onChange={(e) =>
            setUser((prevState) => ({ ...prevState, password: e.target.value }))
          }
          type="password"
          placeholder="Enter password"
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default LoginForm;
