import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const {} = useMutation({
        mutationFn: async () => {},
    })

  return (
    <div className="flex min-h-[100vh] justify-center items-center bg-gray-800">
      <div className="mx-auto max-w-md py-12 px-6 text-center">
        <h1 className="text-4xl mb-8 text-white font-bold">Sign into your account</h1>
        <div className="rounded-lg bg-gray-700 shadow-lg p-8">
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
            <div className="w-full">
              <Link
                to={"/password/forgot"}
                className="text-blue-500 text-sm flex justify-center md:justify-end"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold"
              isDisabled={!email || password.length < 6}
            >
              Sign In
            </Button>
            <p className="text-center text-gray-400 text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-blue-500">
                    Sign Up
                </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
