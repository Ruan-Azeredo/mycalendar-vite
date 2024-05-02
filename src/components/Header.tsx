import { Bars3Icon } from '@heroicons/react/16/solid'
import { useContext } from 'react'
import ModalTag from './ModalTag'
import ModalEvent from './ModalEvent'
import { ManagerContext } from '../contexts/manager'
import { ManagerContextInterface } from '../types'

const Header = () => {

    const context  = useContext(ManagerContext)
    const { tags, configFilter } = context as ManagerContextInterface

    return (
        <div>
            <div className="h-14 flex">
            <h1 className="text-xl p-2 flex">
            <div className="dropdown">
            
            <div tabIndex={0} role="button" className="mx-1"><Bars3Icon className="h-6 w-6 mr-2"/></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                <div>Editar Usuario</div>
                </li>
            </ul>
            </div>
            <span>Olá, </span><span className="font-bold ml-1"> Ruan</span>
            </h1>
            <label className="input input-bordered flex items-center gap-2 ml-auto">
                <input type="text" className="grow" placeholder="Procurar" onChange={(e) => configFilter({name: e.target.value})}/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn mx-1">Selecionar Tags</div>
            <ul tabIndex={0} className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-52">
                {tags?.map(item => (
                <li>
                    <div className="flex">
                    <input type="checkbox" defaultChecked className="checkbox" />
                    <div>{item.name}</div>
                    </div>
                </li>
                ))}
            </ul>
            </div>
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn mx-1">Criar</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><ModalEvent item={undefined} type="create"/></li>
                <li><ModalTag item={undefined} type="create" hide={undefined}/></li>
            </ul>
            </div>
            <div className="join mr-4">
            <input className="join-item btn" type="radio" name="options" aria-label="Mes" />
            <input className="join-item btn" type="radio" name="options" aria-label="Semana" />
            <input className="join-item btn" type="radio" name="options" aria-label="Dia" />
            </div>
        </div>
    </div>
    )
}

export default Header