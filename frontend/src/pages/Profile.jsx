import { MdVerified, MdErrorOutline } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const { email, verified, createdAt } = user;

  return (
    <div className="flex justify-center items-center flex-col mt-10 p-6 bg-gray-700 rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="mb-6 font-bold text-4xl">My Account</h1>

      {verified ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md flex items-center">
          <MdVerified className="h-8 w-8 mr-4 text-green-500" />
          <div>
            <h2 className="font-bold text-lg mb-2">Account Verified</h2>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Verified:</span> {verified.toString()}
            </p>
            <p className="text-sm">
              <span className="font-medium">Created At:</span>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md flex items-center">
          <MdErrorOutline className="h-8 w-8 mr-4 text-red-500" />
          <div>
            <h2 className="font-bold text-lg mb-2">Email Not Verified</h2>
            <p className="text-sm">
              Please check your email <span className="font-medium">{email}</span> to verify your account.
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span> {email}
            </p>
            <p className="text-sm">
              <span className="font-medium">Verified:</span> {verified.toString()}
            </p>
            <p className="text-sm">
              <span className="font-medium">Created At:</span>{" "}
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
