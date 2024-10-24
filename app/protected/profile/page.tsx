import { updateProfileAction, deleteProfileAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { RiLogoutCircleLine } from "react-icons/ri";
import { HiUserCircle } from "react-icons/hi2";
import { Menu } from "@/components/menu";

export default async function Profile() {
  return (
    <div className="w-full flex-1 flex flex-col min-w-80 p-5">
      <div className="flex justify-between items-center pr-2 pb-2 border-b border-[#8be2ee]">
        <Link className="w-7 h-7 rounded-full" href="/protected">
          <RiLogoutCircleLine size={28} />
        </Link>
        <Menu />
      </div>
      <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4 m-auto">
        <h1 className="text-2xl font-medium">Profile</h1>
        <Label htmlFor="fname">First Name</Label>
        <Input
          type="text"
          name="fname"
          placeholder="New Fristname"
          required
        />
        <Label htmlFor="lname">Last Name</Label>
        <Input
          type="text"
          name="lname"
          placeholder="New Lastname"
          required
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <Label htmlFor="confirmemail">Confirm Email</Label>
        <Input
          type="email"
          name="confirmemail"
          placeholder="Confirm Email"
          required
        />
        <Label htmlFor="address">Address</Label>
        <Input
          type="text"
          name="address"
          placeholder="Address"
          required
        />
        <div className="flex justify-around">
          <SubmitButton pendingText="Updating..." formAction={updateProfileAction}>
            Update
          </SubmitButton>
          <SubmitButton pendingText="Deleting..." formAction={deleteProfileAction}>
            Delete
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
