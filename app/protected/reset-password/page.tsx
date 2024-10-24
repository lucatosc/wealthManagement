import { resetPasswordAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Menu } from "@/components/menu";

export default async function ResetPassword() {
  return (
    <div className="w-full flex-1 flex flex-col min-w-80 p-5">
      <div className="flex justify-between items-center pr-2 pb-2 border-b border-[#8be2ee]">
        <Link className="w-7 h-7 rounded-full" href="/protected">
          <RiLogoutCircleLine size={32} />
        </Link>
        <Menu />
      </div>
      <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4 m-auto">
        <h1 className="text-2xl font-medium">Resset password</h1>
        <p className="text-sm /60">
          Please enter your new password below.
        </p>
        <Label htmlFor="password">New password</Label>
        <Input
          type="password"
          name="password"
          placeholder="New password"
          required
        />
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
        />
        <SubmitButton formAction={resetPasswordAction}>
          Reset password
        </SubmitButton>
      </form>
    </div>
  );
}
