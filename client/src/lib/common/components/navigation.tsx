"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import Image from "next/image";
import { ChevronDownIcon } from "../Icons";
import { decodeToken } from "../utils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Navigation() {
  const router = useRouter();
  const [cookie, , removeCookie] = useCookies(["session-data"]);
  const [userName, setUserName] = useState("Cargando...");

  useEffect(() => {
    if (cookie["session-data"]) {
      const decodedToken = decodeToken(cookie["session-data"].token);
      if (decodedToken) {
        setUserName(decodedToken.userName);
      }
    }
  }, [cookie]);

  const handleDeleteCookie = () => {
    removeCookie("session-data", { path: "/" });
    // Esperar un momento para asegurarse de que la cookie se elimine correctamente
    setTimeout(() => {
      router.replace("/");
    }, 100); // Puedes ajustar el tiempo según sea necesario
  };

  const pathname = usePathname();
  const isHidden =
    !/^\/permissions(\/.*)?$/.test(pathname) &&
    !/^\/owners(\/.*)?$/.test(pathname);

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
          <Link
            className={`${
              pathname === "/permissions"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-900"
            } pb-1`}
            href="/permissions"
          >
            Permisos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`${
              pathname === "/owners"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-900"
            } pb-1`}
            href="/owners"
          >
            Propietarios
          </Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem className="flex items-center">
            <DropdownTrigger>
              <Button
                startContent={<Avatar src="/avatar-image.png" size="sm" />}
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon />}
                radius="sm"
                variant="light"
              >
                {userName}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu>
            <DropdownItem>Configuracion</DropdownItem>
            <DropdownItem onClick={handleDeleteCookie}>
              Cerrar Sesion
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default Navigation;
