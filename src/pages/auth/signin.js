// pages/auth/signin.js

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile page if user is logged in
    if (status === "authenticated") {
      router.replace("/profile"); // Replace with your profile page URL
    }
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(result, "result SignIn");
    if (!result.error) {
      // Redirect to dashboard or home page
      router.push("/profile");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
