export interface Event{
    id: string
    user_id: string
    tag_id?: string
    name: string
    description?: string
    done: boolean
    startTime?: number
    finishTime?: number
    created_at?: Date
    updated_at?: Date
}

export interface UpdateEventInterface{
    id?: string
    tag_id?: string
    name?: string
    description?: string
    done?: boolean
    startTime?: number
    finishTime?: number
}

export type EventsTheme = {
    default: string
    color1: string
    color2: string
    color3: string
    color4: string
    color5: string
};

export interface Tag {
    id?: string
    user_id: string
    name: string
    color: keyof EventsTheme
    created_at?: Date
    updated_at?: Date
}

export interface GetEventsParams {
    user_id: string
}

export interface ManagerContextInterface {
    getEvents: (params: GetEventsParams) => void
    getTags: (params: GetEventsParams) => void
    updateEvent: (params: UpdateEventInterface) => void
    createEvent: (params: UpdateEventInterface) => void
    deleteEvent: (params: UpdateEventInterface) => void
    events: [Event]
    tags: [Tag]
    showToast: boolean
    toastMessage: {message: string, status: number}
}
