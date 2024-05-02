import { PencilSquareIcon } from "@heroicons/react/16/solid"
import { Event, ManagerContextInterface, TypeInterface } from "../types/index"
import { useContext, useState } from "react"
import { convertDateTimeToEpoch, convertEpochToDateTime } from "../utils/timeManager"
import { ManagerContext } from "../contexts/manager"

const ModalEvent = (params : {item: Event | undefined, type: keyof TypeInterface}) => {

    const context  = useContext(ManagerContext)
    const { updateEvent, createEvent } = context as ManagerContextInterface

    const item = params.item
    const type = params.type

    const [name, setName] = useState(item?.name)
    const [startTime, setStartTime] = useState(item?.startTime)
    const [finishTime, setFinishTime] = useState(item?.finishTime)
    const [description, setDescription] = useState(item?.description)

    const openModal = () =>{
        const modal = document.getElementById(`event_${item?.id}`) as HTMLDialogElement
        modal.showModal()
    }
    
    const newData = {
        id: item?.id,
        user_id: item?.user_id ? item.user_id : 'f7c31ec4-f64f-44cc-b82a-f33c89d1a556',
        name: item?.name != name ? name : undefined,
        startTime: item?.startTime != startTime ? startTime : undefined,
        finishTime: item?.finishTime != finishTime ? finishTime : undefined,
        description: item?.description != description ? description : undefined
    }

    return (
        <div>
            <div onClick={openModal}>
                {type == "create" ? (
                    <div>Novo Evento</div>
                ) : (
                    <PencilSquareIcon className="w-4 h-4"/>
                )}
            </div>
            <dialog id={`event_${item?.id}`} className="modal">
            <div className="modal-box">
                {type == "create" ? (
                    <h3 className="font-bold text-lg">Criar Evento</h3>
                ) : (
                    <h3 className="font-bold text-lg">Editar Evento</h3>
                )}
                <div className="flex flex-col gap-4">
                    <div>
                        <label className="label" htmlFor="">Nome</label>
                        <input type="text" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} placeholder="Nome" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <div className="flex gap-2">
                        <div>
                            <label className="label" htmlFor="">Inicio</label>
                            <input type="datetime-local" value={convertEpochToDateTime(startTime)} onChange={(e) => setStartTime(convertDateTimeToEpoch(e.target.value))} className="input input-bordered"/>
                        </div>
                        <div>
                            <label className="label" htmlFor="">Final</label>
                            <input type="datetime-local" value={convertEpochToDateTime(finishTime)} onChange={(e) => setFinishTime(convertDateTimeToEpoch(e.target.value))} className="input input-bordered"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="label" htmlFor="">Descrição</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered" placeholder="Descrição"/>
                    </div>
                </div>
                <form method="dialog">
                    {type == "create" ? (
                        <button className="btn mt-4" onClick={() => createEvent(newData)}>Criar</button>
                    ) : (
                        <button className="btn mt-4" onClick={() => updateEvent(newData)}>Atualizar</button>
                    )}
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Close</button>
            </form>
            </dialog>   
        </div>
    )
}

export default ModalEvent