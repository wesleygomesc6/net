import { AppMenuItem } from '@/types'
import AppMenuitem from './AppMenuitem'
import { MenuProvider } from './context/menucontext'

const AppMenu = () => {

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboards', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Gestão',
            items: [
                { label: 'Alunos', icon: 'pi pi-fw pi-id-card', to: '/alunos' },
                { label: 'Disciplinas', icon: 'pi pi-fw pi-book', to: '/disciplinas' },
                { label: 'Professores', icon: 'pi pi-fw pi-users', to: '/professores' },
                { label: 'Turmas', icon: 'pi pi-fw pi-graduation-cap', to: '/turmas' }

            ]
        },
        {
            label: 'Discentes',
            items: [
                { label: 'Turmas', icon: 'pi pi-fw pi-graduation-cap', to: '/discentes/turmas' }
            ]
        },

    ]

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>
                })}
            </ul>
        </MenuProvider>
    )
}

export default AppMenu
