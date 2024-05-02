import ModalEvent from './ModalEvent'
import { Event, ManagerContextInterface, Tag } from '../types'
import { formatDateToList } from '../utils/timeManager'
import { useContext } from 'react'
import { ManagerContext } from '../contexts/manager'
import { TrashIcon } from '@heroicons/react/16/solid'

interface EventInterface{
    item: Event
    tags: [Tag]
}

const EventComponent = ({item, tags} : EventInterface) => {

    const context  = useContext(ManagerContext)
    const { deleteEvent, updateEvent } = context as ManagerContextInterface

    function TagNameById(param: {tag_id: string | undefined}) {
        const tag_id = param.tag_id
        if(!tag_id) return
        const filteredTag = tags.filter((i) => i.id == tag_id)
        return (
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-xs text-white ml-3">{filteredTag[0].name}</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                {tags?.map(tag => (
                    <li onClick={() => updateEvent(
                        {
                            id: item.id,
                            tag_id: tag.id
                        }
                    )}><a>{tag.name}</a></li>
                ))}
                </ul>
            </div>
        )
    }

    return (
        <div className="bg-accent rounded p-2 flex justify-between" key={item.id}>
            <div className="flex my-2 ml-2">
                <input type="checkbox" defaultChecked={item.done} className="checkbox bg-white" onChange={() => updateEvent(
                    {
                        id: item.id,
                        done: !item.done
                    }
                )} />
                <div className="ml-2 text-base-100">{item.name}</div>
                <TagNameById tag_id={item.tag_id}/>
            </div>
            <div>
                <div className="text-base-100 text-sm">{formatDateToList(item.startTime)}</div>
                <div  className="flex">
                <div className="p-1 rounded-full text-white w-fit ml-auto flex text-xs gap-1 group transition ease-in-out duration-300 delay-150">
                    {/* <span className="transition ease-in-out duration-300 delay-150 block hover:bg-blue-300">Deletar</span>  */}
                    <ModalEvent item={item} type="edit"/>
                </div>
                <div className="p-1 rounded-full text-white w-fit ml-auto flex text-xs gap-1 group transition ease-in-out duration-300 delay-150">
                    {/* <span className="transition ease-in-out duration-300 delay-150 block hover:bg-blue-300">Deletar</span>  */}
                    <TrashIcon className="w-4 h-4" onClick={() => deleteEvent({id: item.id})}/>
                </div>
                </div>
            </div>
            </div>
    )
}

export default EventComponent