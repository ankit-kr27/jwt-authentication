import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../lib/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const {
    mutate: sendPasswordReset,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });

  return (
    <div className="flex min-h-[100vh] justify-center items-center bg-gray-800">
      <div className="mx-auto max-w-md py-12 px-6 text-center">
        <h1 className="text-4xl mb-8 text-white font-bold">
          Reset Your Password
        </h1>
        <div className="rounded-lg bg-gray-700 shadow-lg p-8">
          {isError && (
            <div className="text-red-500 text-sm mb-3">
              {error.message || "An error occurred"}
            </div>
          )}
          {isSuccess ? (
            <div className="text-green-500 text-sm mb-3">
              {"Email sent! Check your inbox for further instructions."}
            </div>
          ) : (
            <form action="" className="space-y-4">
              <div className="space-y-2">
                <Input
                  size="sm"
                  autoFocus={true}
                  label={"Email"}
                  type="email"
                  id="email"
                  className="w-full text-gray-100 rounded-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendPasswordReset(email)}
                />
              </div>

              <Button
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
                isDisabled={!email}
                onClick={() => sendPasswordReset(email)}
                isLoading={isPending}
              >
                Reset Password
              </Button>
            </form>
          )}
          <p className="text-center text-gray-400 text-sm mt-4">
            Go back to{" "}
            <Link to="/login" className="text-blue-500" replace>
              Sign In
            </Link>
            {" "}or{" "}
            <Link to="/register" className="text-blue-500" replace>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
