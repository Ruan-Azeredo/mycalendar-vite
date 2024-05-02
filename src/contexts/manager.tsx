import axios, { AxiosResponse } from "axios";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { GetEventsParams, UpdateEventInterface } from "../types";

export const ManagerContext = createContext<unknown>(undefined)

export function ManagerProvider({children}: PropsWithChildren<object>){
    const [events, setEvents] = useState()
    const [tags, setTags] = useState()
    
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState({message: '', status: 200})

    const instance = axios.create({
        baseURL: 'http://localhost:3001/'
    })

    const getEvents = async ({user_id}: GetEventsParams) => {
        
        await instance.get('/event/filteredevents', {
            params: {
                user_id: user_id
            }
        }).then(resp => setEvents(resp.data.events))
    }

    const getTags = async ({user_id}: GetEventsParams) => {
        
        await instance.get('/tag', {
            params: {
                user_id: user_id
            }
        }).then(resp => setTags(resp.data)) 
    }

    useEffect(() => {
        getEvents({user_id: 'f7c31ec4-f64f-44cc-b82a-f33c89d1a556'})
        getTags({user_id: 'f7c31ec4-f64f-44cc-b82a-f33c89d1a556'})
    }, [])

    const succefulRequest = (resp : AxiosResponse) => {
        setToastMessage({message: resp.data.message, status: resp.status})
        console.log(resp)
        setShowToast(true)
        getEvents({user_id: 'f7c31ec4-f64f-44cc-b82a-f33c89d1a556'})
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

    return (
        <ManagerContext.Provider value={{
            getEvents,
            getTags,
            updateEvent,
            createEvent,
            deleteEvent,
            events,
            tags,
            showToast,
            toastMessage
        }}>
            {children}
        </ManagerContext.Provider>
    )
}