"use client";
import React, { useContext } from "react";
import { LayoutContext } from "../../../contexts/LayoutContext";
import Image from "next/image";

const Topbar = () => {
  const { onMenuToggle } = useContext(LayoutContext);

  return (
    <div className="layout-topbar">
      <button
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <div className="layout-topbar-logo">
        <Image src="/logo-sar.svg" alt="logo" width={100} height={35} />
      </div>

      <div className="layout-topbar-menu">
        <button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-user" />
          <span>WESLEY RODRIGUES</span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
