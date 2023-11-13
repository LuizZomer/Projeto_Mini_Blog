import style from './Navbar.module.css';

import { useAuthentication } from '../hooks/useAuthentication';

import { useAuthValue } from '../context/AuthContext';

import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const {user} = useAuthValue();

  const {logout} = useAuthentication()

  return (
    <nav className={style.navbar}>
        <NavLink to='/' className={style.brand}>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={style.links_list}>
            <li><NavLink to='/' className={({isActive}) => (isActive ? style.active : '')}>Home</NavLink></li>
            {!user && (
             <>
               <li><NavLink to='/login' className={({isActive}) => (isActive ? style.active : '')}>
                Entrar
                </NavLink></li>
              <li><NavLink to='/register' className={({isActive}) => (isActive ? style.active : '')}>Cadastrar</NavLink></li>
             </>
            )}
            {user && (
              <>
                <li><NavLink to='/posts/create' className={({isActive}) => (isActive ? style.active : '')}>Novo post</NavLink>
                </li>
                <li><NavLink to='/dashboard' className={({isActive}) => (isActive ? style.active : '')}>Dashboard</NavLink>
                </li>
              </>
            )}
            <li><NavLink to='/about' className={({isActive}) => (isActive ? style.active : '')}>Sobre</NavLink></li>
            {user && (
              <li>
                <button onClick={logout}>Sair</button>
              </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar