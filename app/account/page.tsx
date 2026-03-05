const Account = () => {
  const getInputClass = (fieldName: string) => {
    return `w-full border rounded px-4 py-3 outline-none transition-colors
             "border-gray-300 focus:border-black bg-white"
            }`;
  };

  return (
    <div className="mx-40">
      <h1 className="flex justify-center my-6 mb-18 text-[54px] font-[500]">
        My Account
      </h1>
      <div className="flex gap-18 mb-22">
        <div className="bg-[#F3F5F7] w-1/4 p-2 h-fit">
          <h1 className="flex justify-center my-3 mb-8 font-[600]">Sofia Havertz</h1>
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
        <div className="w-3/4">
          <h1 className="font-[500] text-[20px] mb-4">Account Details</h1>
            <div className=" mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                FIRST NAME *
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className={getInputClass("firstName")}
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                LAST NAME *
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className={getInputClass("lastName")}
              />
            </div>
          <div className="mb-4">
            <label className="uppercase block text-xs font-semibold text-gray-500 mb-1">
              Display Name *
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Display name"
              className={getInputClass("phone")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              EMAIL *
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={getInputClass("email")}
            />
          </div>
          <h1 className="font-[500] text-[20px] mb-4">Password</h1>
          <div className=" mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                OLD PASSWORD *
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Old password"
                className={getInputClass("firstName")}
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                NEW PASSWORD *
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="New password"
                className={getInputClass("lastName")}
              />
            </div>
          <div className="mb-4">
            <label className="uppercase block text-xs font-semibold text-gray-500 mb-1">
              REPEAT NEW PASSWORD *
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Repeat new password"
              className={getInputClass("phone")}
            />
          </div>
          <div className="w-[189px] mt-6 transition-all duration-300 py-2 md:py-3 rounded-lg bg-black flex items-center justify-center cursor-pointer shadow-lg hover:bg-gray-800 hover:scale-[1.02]">
              <h2 className="text-white font-[500] text-sm md:text-base">
                Save changes
              </h2>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
