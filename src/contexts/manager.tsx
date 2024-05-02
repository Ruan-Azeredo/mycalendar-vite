import axios, { AxiosResponse } from "axios";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { GetEventsParams, GetTagsParams, UpdateEventInterface, UpdateTagInterface } from "../types";

export const ManagerContext = createContext<unknown>(undefined)

export function ManagerProvider({children}: PropsWithChildren<object>){
    const [events, setEvents] = useState()
    const [tags, setTags] = useState()
    
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState({message: '', status: 200})

    const [filterParams, setFilterParams] = useState<GetEventsParams>({
        user_id: 'f7c31ec4-f64f-44cc-b82a-f33c89d1a556',
        name: undefined,
        tagId: undefined,
        startTime: undefined,
        finishTime: undefined
    })

    const instance = axios.create({
        baseURL: 'http://localhost:3001/'
    })

    const configFilter = ({name, tagId, startTime, finishTime} : GetEventsParams) => {
        const newFilter = filterParams
        if(name != undefined){
            if(name.length >= 1){
                newFilter.name =  name
            } else{
                newFilter.name = undefined
            }
        }
        if(tagId){
            newFilter.tagId = tagId
        }
        if(startTime != undefined){
            newFilter.startTime = startTime
        }
        if(finishTime != undefined){
            newFilter.finishTime = finishTime
        }
        setFilterParams(newFilter)

        getEvents(newFilter)
    }

    const getEvents = async (filterParams : GetEventsParams) => {
        
        await instance.get('/event/filteredevents', {
            params: filterParams
        }).then(resp => setEvents(resp.data.events))
    }

    const getTags = async ({user_id}: GetTagsParams) => {
        
        await instance.get('/tag', {
            params: {
                user_id: user_id
            }
        }).then(resp => setTags(resp.data)) 
    }

    useEffect(() => {
        getEvents(filterParams)
        getTags(filterParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const succefulRequest = (resp : AxiosResponse) => {
        setToastMessage({message: resp.data.message, status: resp.status})
        setShowToast(true)
        getEvents(filterParams)
        getTags(filterParams)
        setTimeout(() => {
            setShowToast(false)
        }, 4000)
    }

    const updateEvent = async (newData : UpdateEventInterface) => {
        await instance.put(`/event/${newData.id}`, newData).then((resp) => succefulRequest(resp)).catch((resp) => succefulRequest(resp.response))
    }

    const createEvent = async (newData : UpdateEventInterface) => {
        await instance.post('/event', newData).then((resp) => succefulRequest(resp)).catch((resp) => succefulRequest(resp.response))
    }

    const deleteEvent = async (newData : UpdateEventInterface) => {
        await instance.delete(`/event/${newData.id}`).then((resp) => succefulRequest(resp)).catch((resp) => succefulRequest(resp.response))
    }

    const updateTag = async (newData : UpdateTagInterface) => {
        await instance.put(`/tag/${newData.id}`, newData).then((resp) => succefulRequest(resp)).catch((resp) => succefulRequest(resp.response))
    }

    const createTag = async (newData : UpdateTagInterface) => {
        await instance.post('/tag', newData).then((resp) => succefulRequest(resp)).catch((resp) => succefulRequest(resp.response))
    }

    const deleteTag = async (newData : UpdateTagInterface) => {
        await instance.delete(`/tag/${newData.id}`).then((resp) => succefulRequest(resp)).catch((resp) => succefulRequest(resp.response))
    }

    return (
        <ManagerContext.Provider value={{
            getEvents,
            getTags,
            updateEvent,
            createEvent,
            deleteEvent,
            updateTag,
            createTag,
            deleteTag,
            configFilter,
            events,
            tags,
            showToast,
            toastMessage
        }}>
            {children}
        </ManagerContext.Provider>
    )
}