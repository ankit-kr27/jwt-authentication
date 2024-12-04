import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Spinner, Card } from "@nextui-org/react";

const VerifyEmail = () => {
  const { code } = useParams();
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
  });

  return (
    <div className="flex min-h-[100vh] justify-center items-center mt-12">
      <Card className="max-w-md mx-auto py-12 px-6 text-center shadow-lg">
        <h1 className="text-4xl mb-8 font-bold">
          Verifying your email
        </h1>
        {isPending ? (
          <Spinner size="lg" />
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <p
              className={`text-lg font-semibold ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {isSuccess ? "Email Verified!" : "Invalid Link"}
            </p>

            {isError && (
              <p className="text-gray-600">
                The link is either invalid or expired.{" "}
                <Link to="/password/forgot" className="text-blue-500">
                  Get a new link
                </Link>
              </p>
            )}
            <Link to="/" className="text-blue-500">
              Back to home
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VerifyEmail;
