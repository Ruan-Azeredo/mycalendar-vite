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
    tag_id?: string | null
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

export interface UpdateTagInterface{
    id?: string
    name?: string
    color?: keyof EventsTheme
    created_at?: Date
    updated_at?: Date
}

export interface GetEventsParams {
    user_id?: string
    name?: string
    tagId?: string
    startTime?: number
    finishTime?: number
}

export interface GetTagsParams {
    user_id?: string
    name?: string
    color?: keyof EventsTheme
}

export interface ManagerContextInterface {
    getEvents: (params: GetEventsParams) => void
    getTags: (params: GetTagsParams) => void
    updateEvent: (params: UpdateEventInterface) => void
    createEvent: (params: UpdateEventInterface) => void
    deleteEvent: (params: UpdateEventInterface) => void
    updateTag: (params: UpdateTagInterface) => void
    createTag: (params: UpdateTagInterface) => void
    deleteTag: (params: UpdateTagInterface) => void
    configFilter: (params: GetEventsParams) => void
    events: [Event]
    tags: [Tag]
    showToast: boolean
    toastMessage: {message: string, status: number}
}

export interface TypeInterface{
    create: string
    edit: string
    delete: string
}