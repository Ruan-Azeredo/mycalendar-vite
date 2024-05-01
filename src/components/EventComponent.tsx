import ModalEvent from './ModalEvent'
import { Event, Tag } from '../types'
import { formatDateToList } from '../utils/timeManager'

interface EventInterface{
    item: Event
    tags: [Tag]
}

const EventComponent = ({item, tags} : EventInterface) => {

    function TagNameById(param: {tag_id: string | undefined}) {
        const tag_id = param.tag_id
        if(!tag_id) return
        const filteredTag = tags.filter((i) => i.id == tag_id)
        return (
            <span className="badge badge-ghost ml-2 mt-auto text-white">{filteredTag[0].name}</span>
        )
    }

    return (
        <div className="bg-accent rounded p-2 flex justify-between" key={item.id}>
            <div className="flex my-2 ml-2">
                <input type="checkbox" defaultChecked={item.done} className="checkbox bg-white" />
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
                    <ModalEvent item={item} type="delete"/>
                </div>
                </div>
            </div>
            </div>
    )
}

export default EventComponent