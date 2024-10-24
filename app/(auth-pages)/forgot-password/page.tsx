import { forgotPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2  [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Reset Password</h1>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <p className="text-sm  text-center">
            <Link className=" font-medium text-blue-500" href="/sign-in">
              Already have an account?
            </Link>
            <br></br>
            <Link className=" font-medium text-blue-500" href="/sign-in">
              Sign In
            </Link>
          </p>
          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
        </div>
      </form>
    </>
  );
}
