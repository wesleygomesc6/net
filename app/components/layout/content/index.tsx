"use client";
import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import ClientOnly from "../../ClientOnly";

const Content = ({ children }) => {
  const items = [{ label: "pagina inicial" }];
  const home = { icon: "pi pi-home", url: "/" };

  return (
    <div className="layout-main-container">
      <div className="layout-main">
        <div className="flex justify-content-between align-items-center">
            <ClientOnly>
                <BreadCrumb model={items} home={home} />
            </ClientOnly>
            <div>
                <Button icon="pi pi-minus" className="p-button-text p-button-rounded" />
                <Button icon="pi pi-circle" className="p-button-text p-button-rounded" />
                <Button icon="pi pi-plus" className="p-button-text p-button-rounded" />
                <Button icon="pi pi-moon" className="p-button-text p-button-rounded" />
            </div>
        </div>
        <div className="card mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Content;
