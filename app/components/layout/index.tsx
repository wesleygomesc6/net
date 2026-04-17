"use client";
import React, { useContext } from "react";
import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Content from "./content";
import { LayoutContext } from "../../contexts/LayoutContext";
import classNames from "classnames";

const Layout = ({ children }) => {
  const { layoutState, isStatic, hideMenu } = useContext(LayoutContext);

  const containerClassName = classNames("layout-wrapper", {
    "layout-sidebar-inactive": layoutState.staticMenuDesktopInactive && isStatic(),
    "layout-mobile-sidebar-active": layoutState.staticMenuMobileActive,
  });

  const maskClassName = classNames("layout-mask", {
    "layout-mask-active": layoutState.staticMenuMobileActive,
  });

  return (
    <div className={containerClassName}>
      <Topbar />
      <Sidebar />
      <Content>{children}</Content>
      <div className={maskClassName} onClick={hideMenu}></div>
    </div>
  );
};

export default Layout;
