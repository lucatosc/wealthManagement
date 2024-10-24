"use client";
import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from "@mui/material/Button";
import { HiUserCircle } from "react-icons/hi2";

export function Menu() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event: Event | React.SyntheticEvent) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event: React.KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    const handleSignOut = async () => {
        // Call signOutAction
        await signOutAction(); // Ensure your signOutAction returns a promise.
        // Redirect after the action has been executed
        router.push('/sign-in');
    };

    return (
        <>
            <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <HiUserCircle size={32}/>
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                            >
                                <MenuItem>
                                    <Link href="/protected/profile">
                                        My Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link href="/protected/reset-password">
                                        Reset Password
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}