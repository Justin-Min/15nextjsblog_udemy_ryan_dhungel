import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import { APP_NAME } from '../config'
import { signout, isAuth } from '../actions/auth'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap'
import '../node_modules/nprogress/nprogress.css'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Link href='/' passHref>
          <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <Link href='/blogs'>
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>
            {!isAuth() && (
              <>
                <NavItem>
                  <Link href='/signin' passHref>
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signup' passHref>
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href='/user'>
                  <NavLink>{`${isAuth().name}' Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href='/admin'>
                  <NavLink>{`${isAuth().name}' Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Header
