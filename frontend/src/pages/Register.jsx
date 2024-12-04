import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../lib/api";
import { Button, Input } from "@nextui-org/react";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate("/", {
        replace: true,
      });
    },
  });
  return (
    <div className="flex min-h-[100vh] justify-center items-center bg-gray-800">
      <div className="mx-auto max-w-md py-12 px-6 text-center">
        <h1 className="text-4xl mb-8 text-white font-bold">
          Create an account
        </h1>
        <div className="rounded-lg bg-gray-700 shadow-lg p-8">
          {isError && (
            <div className="text-red-500 text-sm mb-3">
              {error.message || "An error occurred"}
            </div>
          )}
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
              />
            </div>
            <div className="space-y-2">
              <Input
                size="sm"
                label={"Password"}
                type="password"
                id="password"
                className="w-full text-gray-100 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="text-gray-400 text-xs">
              - Password must be at least 6 characters long
            </p>
            <div className="space-y-2">
              <Input
                size="sm"
                label={"Confirm Password"}
                type="password"
                id="confirmPassword"
                className="w-full text-gray-100 rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  createAccount({ email, password, confirmPassword })
                }
              />
            </div>

            <Button
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
              isDisabled={
                !email || password.length < 6 || password !== confirmPassword
              }
              onClick={() =>
                createAccount({ email, password, confirmPassword })
              }
              isLoading={isPending}
            >
              Create Account
            </Button>
            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
