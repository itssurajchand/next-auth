// pages/auth/signin.js

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Redirect to profile page if user is logged in
    if (status === "authenticated") {
      router.replace("/profile"); // Replace with your profile page URL
    }
  }, [status]);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(result, "result SignIn");
    if (!result.error) {
      // Redirect to dashboard or home page
      router.push("/profile");
    } else {
      alert("User not exist");
    }
  };

  /* const handleSubmit = async (event) => {
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
  }; */

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <h1>Sign In</h1>
      {/*  <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          className="form-control"
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
      </form> */}
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <p className="errorMsg">Email is required.</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p className="errorMsg">Email is not valid.</p>
            )}
          </div>
          <div className="mt-2">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password && errors.password.type === "required" && (
              <p className="errorMsg">Password is required.</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="errorMsg">
                Password should be at-least 6 characters.
              </p>
            )}
          </div>
          <div>
            <label></label>
            <button type="submit" className="btn btn-primary mt-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
