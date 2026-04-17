"use client";
import React, { useContext } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { LayoutContext } from '../../../contexts/LayoutContext';

const Sidebar = () => {
    const { layoutState } = useContext(LayoutContext);
    const items = [
        {
            label: 'ADMIN',
            items: [
                {
                    label: 'Bancos',
                    icon: 'pi pi-fw pi-university'
                },
                {
                    label: 'Contas Contábeis',
                    icon: 'pi pi-fw pi-book'
                },
                {
                    label: 'Grupo - Convênios',
                    icon: 'pi pi-fw pi-users'
                },
                {
                    label: 'Índices INPC',
                    icon: 'pi pi-fw pi-chart-line'
                },
                {
                    label: 'Motivos de Desconto',
                    icon: 'pi pi-fw pi-tag'
                },
                {
                    label: 'Valores Padrões',
                    icon: 'pi pi-fw pi-dollar'
                }
            ]
        },
        {
            label: 'ATENDIMENTO',
            items: [
                {
                    label: 'Gerar Boleto',
                    icon: 'pi pi-fw pi-barcode'
                },
                {
                    label: 'Listar débitos',
                    icon: 'pi pi-fw pi-list'
                },
                {
                    label: 'Parcelamentos',
                    icon: 'pi pi-fw pi-calendar'
                }
            ]
        },
        {
            label: 'MENUS',
            items: [
                {
                    label: 'Pagar Anuidades',
                    icon: 'pi pi-fw pi-money-bill'
                },
                {
                    label: 'Parcelamentos',
                    icon: 'pi pi-fw pi-calendar'
                }
            ]
        }
    ];

    const getTemplate = (item, options) => {
        const className = `${options.className} flex align-items-center p-2`;
        const isCollapsed = layoutState.staticMenuDesktopInactive;

        return (
            <div className={className}>
                <span className={item.icon}></span>
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
            </div>
        );
    };

    const model = items.map(item => {
        const subItems = item.items.map(subItem => {
            return { ...subItem, template: (item, options) => getTemplate(item, options) };
        });
        return { ...item, template: (item, options) => getTemplate(item, options), items: subItems };
    });


    return (
        <div className="layout-sidebar">
            <PanelMenu model={model} className="w-full" />
        </div>
    );
};

export default Sidebar;
