import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../lib/api";

// eslint-disable-next-line react/prop-types
const ResetPasswordForm = ({code}) => {
    const [password, setPassword] = useState("");
    const {
        mutate: resetUserPassword,
        isPending,
        isSuccess,
        isError,
        error,
    } = useMutation({
        mutationFn: resetPassword,
    });
  return (
    <>
      <h1 className="text-4xl mb-8 font-bold text-white">Change your password</h1>
      <div className="rounded-lg bg-gray-700 p-8">
        {isError && (
          <div className="text-red-500 text-sm mb-3">
            {error.message || "An error occurred"}
          </div>
        )}
        {isSuccess ? (
            <>
                <div className="text-green-500 text-sm mb-3">
            Password changed successfully!
          </div>
            <Link to="/login" className="text-blue-500">
            Sign in
            </Link>
            </>
        ) : (
          <form action="" className="space-y-4">
            <div className="space-y-2">
              <Input
                size="sm"
                autoFocus={true}
                label={"New Password"}
                type="password"
                id="password"
                className="w-full text-gray-100 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && resetUserPassword({ password, verificationCode: code })}
              />
            </div>
            <Button
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
              isDisabled={!password || password.length < 6}
              onClick={() => resetUserPassword({ password, verificationCode: code })}
              isLoading={isPending}
            >
              Reset Password
            </Button>
          </form>
        )}
      </div>
    </>
  )
}

export default ResetPasswordForm
