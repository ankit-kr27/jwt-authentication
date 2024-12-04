import { Link, useSearchParams } from "react-router-dom"
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPassword = () => {

    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    const exp = Number(searchParams.get("exp"));
    const now = Date.now();
    const linkIsValid = code && exp && now < exp;


  return (
    <div className="flex min-h-[100vh] justify center bg-gray-800 items-center">
      <div className="mx-auto max-w-md py-12 px-6 text-center">
        {
            linkIsValid ? (<ResetPasswordForm code={code} />) : (
                <div className="rounded-lg bg-gray-700 shadow-lg p-8">
                    <p className="text-red-500 text-sm mb-3">
                    The link is either invalid or expired.
                    </p>
                    <Link to="/password/forgot" className="text-blue-500">
                    Get a new link
                    </Link>
                </div>
            )
        }
      </div>
    </div>
  )
}

export default ResetPassword
