// import AuthLayout from "@/components/AuthLayout";
// import Link from "next/link";
// import React from "react";

// export default function SignInPage() {
//     return (
//         <AuthLayout>
//             <h1 className="text-3xl md:text-4xl font-semibold mb-2 md:mb-3 text-black font-poppins">Sign In</h1>
//             <p className="text-gray-500 mb-4 md:mb-8 font-poppins text-sm md:text-base">
//                 Don&apos;t have an account yet?{" "}
//                 <Link href="/signup" className="text-[#38cb89] font-medium hover:underline">
//                     Sign Up
//                 </Link>
//             </p>

//             <form className="space-y-4 md:space-y-8 flex flex-col font-poppins w-full">
//                 <div className="flex flex-col">
//                     <input
//                         type="text"
//                         id="usernameOrEmail"
//                         placeholder="Your username or email address"
//                         className="w-full border-b border-gray-300 py-2 md:py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
//                     />
//                 </div>

//                 <div className="flex flex-col relative group">
//                     <input
//                         type="password"
//                         id="password"
//                         placeholder="Password"
//                         className="w-full border-b border-gray-300 py-2 md:py-3 text-sm focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-400"
//                     />
//                     <button type="button" className="absolute right-0 top-3 text-gray-400 hover:text-black transition-colors">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                     </button>
//                 </div>

//                 <div className="flex items-center justify-between pt-2">
//                     <div className="flex items-center space-x-3">
//                         <input
//                             type="checkbox"
//                             id="remember"
//                             className="w-5 h-5 border-gray-300 rounded text-black focus:ring-black accent-black"
//                         />
//                         <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
//                             Remember me
//                         </label>
//                     </div>
//                     <Link href="#" className="font-semibold text-sm text-black hover:underline">
//                         Forgot password?
//                     </Link>
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full bg-black text-white rounded-lg py-3 md:py-3.5 text-base font-medium hover:bg-gray-800 transition-colors mt-6 md:mt-8"
//                 >
//                     Sign In
//                 </button>
//             </form>
//         </AuthLayout>
//     );
// }

"use client";

import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
const supabase = createClient();
type FormInputs = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-3xl md:text-4xl font-semibold mb-2 md:mb-3 text-black font-poppins">
        Sign In
      </h1>

      <p className="text-gray-500 mb-4 md:mb-8 font-poppins text-sm md:text-base">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/signup"
          className="text-[#38cb89] font-medium hover:underline"
        >
          Sign Up
        </Link>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-8 flex flex-col font-poppins w-full"
      >
        <input
          type="email"
          {...register("email", { required: "Email required" })}
          placeholder="Email address"
          className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black bg-transparent"
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}

        <div className="flex flex-col relative group">
          <input
            type="password"
            {...register("password", { required: "Password required" })}
            placeholder="Password"
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-black bg-transparent"
          />
          <button
            type="button"
            className="absolute right-0 top-3 text-gray-400 hover:text-black transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="remember"
              className="w-5 h-5 border-gray-300 rounded text-black focus:ring-black accent-black"
            />
            <label
              htmlFor="remember"
              className="text-sm text-gray-500 cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <Link
            href="#"
            className="font-semibold text-sm text-black hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white rounded-lg py-3 text-base font-medium hover:bg-gray-800 transition-colors"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </AuthLayout>
  );
}
