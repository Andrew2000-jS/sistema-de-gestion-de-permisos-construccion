"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDownIcon } from "../Icons";

function Navigation() {
  const pathname = usePathname();
  const isHidden =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/login/email" ||
    pathname === "/login/verify";

  return (
    <Navbar
      maxWidth="full"
      className={`${isHidden ? "hidden" : "flex"} py-5`}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand className="pl-20">
        <Link href="/">
          <Image
            src={"/logo-alcaldia-2.png"}
            alt="logo alcaldia"
            height={130}
            width={130}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8 pr-20" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Permisos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/">
            Propietarios
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem className="flex items-center">
            <DropdownTrigger>
              <Button
                startContent={
                  <Avatar src="https://images.unsplash.com/broken" />
                }
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon />}
                radius="sm"
                variant="light"
              >
                Jhon Doe
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem></DropdownItem>

            <DropdownItem>Cerrar Sesion</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default Navigation;
