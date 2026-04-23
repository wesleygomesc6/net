/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { AppTopbarRef, ChildContainerProps, LayoutState } from '@/types'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEventListener, useUnmountEffect } from 'primereact/hooks'
import { classNames } from 'primereact/utils'
import React, { useContext, useEffect, useRef } from 'react'
import AppConfig from './AppConfig'
import AppFooter from './AppFooter'
import AppSidebar from './AppSidebar'
import AppTopbar from './AppTopbar'
import { LayoutContext } from './context/layoutcontext'
import NotificacaoToastProvider from './context/notificacaotoastcontext'

const Layout = ({ children }: ChildContainerProps) => {
  const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext)
  const topbarRef = useRef<AppTopbarRef>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const unblockBodyScroll = (): void => {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll')
    } else {
      document.body.className = document.body.className.replace(
        new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'),
        ' ',
      )
    }
  }

  const hideMenu = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      menuHoverActive: false,
    }))
    unbindMenuOutsideClickListener()
    unblockBodyScroll()
  }

  const [bindProfileMenuOutsideClickListener, unbindProfileMenuOutsideClickListener] = useEventListener({
    type: 'click',
    listener: (event) => {
      const isOutsideClicked = !(
        topbarRef.current?.topbarmenu?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenu?.contains(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.isSameNode(event.target as Node) ||
        topbarRef.current?.topbarmenubutton?.contains(event.target as Node)
      )

      if (isOutsideClicked) {
        hideProfileMenu()
      }
    },
  })

  const hideProfileMenu = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      profileSidebarVisible: false,
    }))
    unbindProfileMenuOutsideClickListener()
  }

  const [bindMenuOutsideClickListener, unbindMenuOutsideClickListener] = useEventListener({
    type: 'click',
    listener: (event) => {
      const isOutsideClicked = !(
        sidebarRef.current?.isSameNode(event.target as Node) ||
        sidebarRef.current?.contains(event.target as Node) ||
        topbarRef.current?.menubutton?.isSameNode(event.target as Node) ||
        topbarRef.current?.menubutton?.contains(event.target as Node)
      )

      if (isOutsideClicked) {
        hideMenu()
      }
    },
  })

  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    hideMenu()
    hideProfileMenu()
  }, [pathname, searchParams])

  const blockBodyScroll = (): void => {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll')
    } else {
      document.body.className += ' blocked-scroll'
    }
  }

  useEffect(() => {
    if (layoutState.overlayMenuActive || layoutState.staticMenuMobileActive) {
      bindMenuOutsideClickListener()
    }

    if (layoutState.staticMenuMobileActive) {
      blockBodyScroll()
    }
  }, [layoutState.overlayMenuActive, layoutState.staticMenuMobileActive])

  useEffect(() => {
    if (layoutState.profileSidebarVisible) {
      bindProfileMenuOutsideClickListener()
    }
  }, [layoutState.profileSidebarVisible])

  useUnmountEffect(() => {
    unbindMenuOutsideClickListener()
    unbindProfileMenuOutsideClickListener()
  })

  const containerClass = classNames('layout-wrapper', {
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
    'p-input-filled': layoutConfig.inputStyle === 'filled',
    'p-ripple-disabled': !layoutConfig.ripple,
  })

  return (
    <NotificacaoToastProvider>
      <React.Fragment>
        <div className={containerClass}>
          <AppTopbar ref={topbarRef} />
          <div ref={sidebarRef} className="layout-sidebar">
            <AppSidebar />
          </div>
          <div className="layout-main-container">
            <div className="layout-main">{children}</div>
            <AppFooter />
          </div>
          <AppConfig />
          <div className="layout-mask"></div>
        </div>
      </React.Fragment>
    </NotificacaoToastProvider>
  )
}

export default Layout
