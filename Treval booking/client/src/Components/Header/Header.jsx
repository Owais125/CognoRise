import React, { useRef, useEffect, useContext } from 'react'
import { Container, Row, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './header.css'
import { AuthContext } from "../../context/AuthContext"




const nav__links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
]

const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const stickyHeaderFunction = () => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 70) {
          headerRef.current.classList.add('sticky__header');
        } else {
          headerRef.current.classList.remove('sticky__header');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };

  useEffect(() => {
    const cleanup = stickyHeaderFunction();
    return cleanup; // Call cleanup function on component unmount
  }, [user]);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show__menu');
    }
  };

  // console.log(user)
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between  ">
            {/* ======Start Logo===== */}
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            {/* ======End Logo===== */}
            {/* ======Menu Start===== */}
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul style={{ listStyle: 'none' }} className="menu d-flex align-items-center gap-5 ">
                {nav__links.map((item, index) => {
                  return <li key={index} className="nav__item">
                    <NavLink className={navClass => navClass.isActive ? "active__link" : ""} to={item.path}>{item.display}</NavLink>
                  </li>
                })}
              </ul>
            </div>
            {/* ======Menu End===== */}
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {
                  user ? <>
                    <h5 className='mb-0'>{user.username}</h5>
                    <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                  </> : <>
                    <Button className='btn btn-light butoonLog'>
                      <Link to='/login'>Login</Link>
                    </Button>
                    <Button className='btn btn-warning butoonReg'>
                      <Link to='/register'>Register</Link>
                    </Button>
                  </>
                }

              </div>
              <span className="mobile__menu" onClick={toggleMenu}> 
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header