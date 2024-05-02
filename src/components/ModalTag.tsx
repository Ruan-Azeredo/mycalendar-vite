import { useContext, useState } from "react"
import { ManagerContext } from "../contexts/manager"
import { EventsTheme, ManagerContextInterface, Tag, TypeInterface } from "../types"
import { eventsTheme } from "../types/colors"
import { PencilSquareIcon } from "@heroicons/react/16/solid"

const ModalTag = (params : {item: Tag | undefined, type: keyof TypeInterface, hide: string | undefined}) => {

    const context  = useContext(ManagerContext)
    const { updateTag, createTag } = context as ManagerContextInterface

    const item = params.item
    const type = params.type
    const hide = params.hide

    const [name, setName] = useState(item?.name)
    const [color, setColor] = useState(item?.color)

    const openModal = () =>{
        const modal = document.getElementById(`tag_${item?.id}`) as HTMLDialogElement
        modal.showModal()
    }
    
    const newData = {
        id: item?.id,
        user_id: item?.user_id ? item.user_id : 'f7c31ec4-f64f-44cc-b82a-f33c89d1a556',
        name: item?.name != name ? name : undefined,
        color: item?.color != color ? color : undefined
    }

    return (
        <div>
            <div onClick={openModal}>
                {type == "create" ? (
                    <div>Nova Tag</div>
                ) : (
                    <PencilSquareIcon className={`w-4 h-4 ${hide}`}/>
                )}
            </div>
            <dialog id={`tag_${item?.id}`} className="modal">
            <div className="modal-box">
                {type == "create" ? (
                    <h3 className="font-bold text-lg">Criar Tag</h3>
                ) : (
                    <h3 className="font-bold text-lg">Editar Tag</h3>
                )}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="label" htmlFor="">Nome</label>
                        <input type="text" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} placeholder="Nome" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="flex flex-col">
                        <label className="label">Cor</label>
                        <div className="grid grid-cols-3">
                            {Object.keys(eventsTheme).map((themeKey) => {
                                const theme = themeKey as keyof EventsTheme;
                                return(
                                    <div key={theme} className="flex items-center my-1">
                                        <input style={{backgroundColor: eventsTheme[theme]}}
                                            type="radio"
                                            className={`radio radio-[${eventsTheme[theme]}]`}
                                            id={theme}
                                            value={theme}
                                            checked={color === theme}
                                            onChange={() => setColor(theme)}
                                        />
                                        <label htmlFor={theme} className="ml-2">{eventsTheme[theme]}</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <form method="dialog">
                        {type == "create" ? (
                            <button className="btn mt-4" onClick={() => createTag(newData)}>Criar</button>
                        ) : (
                            <button className="btn mt-4" onClick={() => updateTag(newData)}>Atualizar</button>
                        )}
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Close</button>
            </form>
            </dialog>   
        </div>
    )
}

export default ModalTag