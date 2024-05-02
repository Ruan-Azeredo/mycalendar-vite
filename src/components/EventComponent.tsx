import ModalEvent from './ModalEvent'
import { Event, ManagerContextInterface, Tag } from '../types'
import { formatDateToList } from '../utils/timeManager'
import { useContext, useEffect, useState } from 'react'
import { ManagerContext } from '../contexts/manager'
import { TrashIcon } from '@heroicons/react/16/solid'
import ModalTag from './ModalTag'
import { eventsTheme } from '../types/colors'

interface EventInterface{
    item: Event
    tags: [Tag]
}

const EventComponent = ({item, tags} : EventInterface) => {

    const context  = useContext(ManagerContext)
    const { deleteEvent, updateEvent, deleteTag } = context as ManagerContextInterface

    const [bgColor, setBgColor] = useState(eventsTheme["default"])

    function Tag(param: {tag_id: string | undefined}) {
        const tag_id = param.tag_id
        const filteredTag = tags.filter((i) => i.id == tag_id)
        return (
            <div className='flex ml-3 bg-neutral rounded-lg'>
                <div className="dropdown group">
                    <div tabIndex={0} role="button" className="btn btn-xs text-white">
                        { tag_id ? (
                            <div>{filteredTag[0].name}</div>
                        ) : (
                            <div>+</div>
                        )}
                        
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    {tags?.map(tag => (
                        <li key={tag.id} onClick={() => updateEvent(
                            {
                                id: item.id,
                                tag_id: tag.id
                            }
                        )}><div className='text-white'>{tag.name}</div></li>
                    ))}
                    <li onClick={() => updateEvent(
                            {
                                id: item.id,
                                tag_id: null
                            }
                        )}><div className='text-white'>X</div></li>
                    </ul>
                </div>
                {tag_id ? (
                    <div className='flex w-0 group-hover:w-fit'>
                        <span className='text-white ml-2 my-auto'><ModalTag hide={'hidden group-hover:block'} item={filteredTag[0]} type={'edit'}/></span>
                        <span className='text-white mx-2 my-auto'><TrashIcon className="w-4 h-4 hidden group-hover:block" onClick={() => deleteTag({id: tag_id})}/></span>
                    </div>
                ) : null}
            </div>
        )
    }

    const getColor = (tag_id: string | undefined) : void => {       
        if(!tag_id){
            setBgColor(`${eventsTheme['default']}`)
        } else{
            const filteredTag = tags.filter((i) => i.id == tag_id)
    
            setBgColor(`${eventsTheme[filteredTag[0].color]}`)
        }

    }
    useEffect(() =>  {
        getColor(item.tag_id)
    }, [item, tags])

    return (
        <div style={{backgroundColor: bgColor}} className='rounded p-2 flex justify-between group' key={item.id}>
            <div className="flex my-2 ml-2">
                <input type="checkbox" defaultChecked={item.done} className="checkbox [--chkbg:theme(colors.white)] border-white border-2" onChange={() => updateEvent(
                    {
                        id: item.id,
                        done: !item.done
                    }
                )} />
                <div className="ml-2 text-base-100">{item.name}</div>
                <Tag tag_id={item.tag_id}/>
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