import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/api";
import queryClient from "../config/queryClient";

const UserMenu = () => {
  const navigate = useNavigate();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
        queryClient.clear();
        navigate("/login", { replace: true });
    }
  })

  return (
    <Dropdown placement="top-end">
      <DropdownTrigger>
        <User
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="profile" onClick={() => navigate("/")}>
          Profile
        </DropdownItem>
        <DropdownItem key="settings" onClick={() => navigate("/settings")}>
          Settings
        </DropdownItem>
        <DropdownItem key="sign-out" onClick={signOut} color="danger">
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
