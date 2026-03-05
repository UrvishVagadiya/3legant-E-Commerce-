"use client";
import { useForm } from "react-hook-form";
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

const Account = () => {
    const [fullName,setFullName]=useState("");
  const router = useRouter();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
    watch,
    setValue,
  } = useForm<FormData>();


  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data?.user) {
        const user = data.user;
        const fullName = data.user.user_metadata?.name || "";
const [firstName, lastName] = fullName.split(" ");
setFullName(fullName);

        setValue("email", user.email || "");

        setValue("displayName", user.user_metadata?.username || "");
        setValue("firstName", firstName || "");
        setValue("lastName", lastName || "");
      }
      
    };
    

    fetchUser();
  }, [supabase, setValue]);


  const onSubmit = async (data: FormData) => {
    if (data.newPassword !== data.repeatNewPassword) return;
    if(data.oldPassword)
    {
        const{error:signInError}=await supabase.auth.signInWithPassword({
            email:data.email || "",
            password:data.oldPassword
        })
         
    }
   
    const { error } = await supabase.auth.updateUser({
      email: data.email,
      password: data.newPassword || undefined,
      data: {
        name:`${data.firstName} ${data.lastName}`,
        displayName: data.displayName,
      },
    });

    if (!error) {
      router.push("/");
    } else {
      console.log(error.message);
    }
  };

  const getInputClass = (fieldName: keyof FormData) => {
    return `w-full border rounded px-4 py-3 outline-none transition-colors ${
      errors[fieldName]
        ? "border-red-500"
        : "border-gray-300 focus:border-black bg-white"
    }`;
  };

  return (
    <div className="mx-40">
      <h1 className="flex justify-center my-6 mb-18 text-[54px] font-[500]">
        My Account
      </h1>

      <div className="flex gap-18 mb-22">
        <div className="bg-[#F3F5F7] w-1/4 p-2 h-fit">
          <h1 className="capitalize flex justify-center my-3 mb-8 font-[600]">{fullName}</h1>

          <div className="flex flex-col gap-4 pb-6">
            <h2 className="text-gray-400 hover:border-b hover:font-[500] hover:text-gray-900">
              Account
            </h2>
            <h2 className="text-gray-400 hover:border-b hover:font-[500] hover:text-gray-900">
              Address
            </h2>
            <h2 className="text-gray-400 hover:border-b hover:font-[500] hover:text-gray-900">
              Orders
            </h2>
            <h2 className="text-gray-400 hover:border-b hover:font-[500] hover:text-gray-900">
              Wishlist
            </h2>
            <h2 className="text-gray-400 hover:border-b hover:font-[500] hover:text-gray-900">
              Log out
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-3/4">
          <h1 className="font-[500] text-[20px] mb-4">Account Details</h1>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              FIRST NAME *
            </label>

            <input
              type="text"
              placeholder="First name"
              {...register("firstName", { required: "First name is required" })}
              className={getInputClass("firstName")}
            />

            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              LAST NAME *
            </label>

            <input
              type="text"
              placeholder="Last name"
              {...register("lastName", { required: "Last name is required" })}
              className={getInputClass("lastName")}
            />

            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="uppercase block text-xs font-semibold text-gray-500 mb-1">
              Display Name *
            </label>

            <input
              type="text"
              placeholder="Display name"
              {...register("displayName", {
                required: "Display name is required",
              })}
              className={getInputClass("displayName")}
            />

            {errors.displayName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              EMAIL *
            </label>

            <input
              type="email"
              placeholder="Email"
              disabled
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email format is invalid",
                },
              })}
              className={getInputClass("email")}
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <h1 className="font-[500] text-[20px] mb-4">Password</h1>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              OLD PASSWORD *
            </label>

            <input
              type="password"
              placeholder="Old password"
              {...register("oldPassword", {
                
              })}
              className={getInputClass("oldPassword")}
            />

            {errors.oldPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              NEW PASSWORD *
            </label>

            <input
              type="password"
              placeholder="New password"
              {...register("newPassword", {
               
              })}
              className={getInputClass("newPassword")}
            />

            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="uppercase block text-xs font-semibold text-gray-500 mb-1">
              REPEAT NEW PASSWORD *
            </label>

            <input
              type="password"
              placeholder="Repeat new password"
              {...register("repeatNewPassword", {
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className={getInputClass("repeatNewPassword")}
            />

            {errors.repeatNewPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.repeatNewPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[189px] mt-6 transition-all duration-300 py-2 md:py-3 rounded-lg bg-black flex items-center justify-center cursor-pointer shadow-lg hover:bg-gray-800 hover:scale-[1.02]"
          >
            <h2 className="text-white font-[500] text-sm md:text-base">
              {isSubmitting ? "saving..." : "Save Changes"}
            </h2>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;