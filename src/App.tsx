import { useContext } from "react"
import { ManagerContext } from "./contexts/manager"
import { EventsTheme, ManagerContextInterface } from "./types"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import ptbrLocale from '@fullcalendar/core/locales/pt-br';
import { eventsTheme } from "./types/colors"
import { formatDateToCalendar } from "./utils/timeManager"
import EventComponent from "./components/EventComponent"
import Header from "./components/Header"

function App() {

  const context  = useContext(ManagerContext)
  const { events, tags, showToast, toastMessage } = context as ManagerContextInterface

  function TagColorById(tag_id: string | undefined) : keyof EventsTheme{
    if(!tag_id) return 'default'
    const filteredTag = tags.filter(item => item.id == tag_id)
    return filteredTag[0].color
  }

  return (
    <>
    <div className="h-screen w-screen p-4">
      <Header/>
      <div className="flex">
        <div className="w-1/3">
          <div className="bg-neutral rounded-md p-2">
            <h2 className="text-xl font-semibold text-white text-center pb-2">To do</h2>
            <div className="flex flex-col gap-1">
              {events?.map(item => (
                  <EventComponent item={item} tags={tags}/>
                ))}
            </div>
          </div>
        </div>
        <div className="w-2/3 px-4 relative">
        <div className="border-4 border-neutral rounded-md p-4">
          <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin ]}
            initialView="dayGridMonth"
            //weekends={true}
            themeSystem=""
            headerToolbar={{start: '', center: 'title', end: ''}}
            footerToolbar={{ start: 'today prev,next', end: 'dayGridMonth,timeGridWeek,timeGridDay'}}
            buttonText={{
              today:    'Hoje',
              month:    'Mes',
              week:     'Semana',
              day:      'Dia',
              list:     'Lista'
            }}
            locale={ptbrLocale}
            events={events?.map(item => {return {title: item.name, color: eventsTheme[TagColorById(item.tag_id)], start: formatDateToCalendar(item.startTime), end: formatDateToCalendar(item.finishTime)}})}
            eventColor='#37cdbe'
            eventTimeFormat={{ hour: '2-digit', minute: '2-digit', meridiem: false, hour12: false}}
            allDayText=""
            
          /> 
        </div>
        </div>
      </div>
    </div>
    <div className={`toast ${showToast ? 'block' : 'hidden'} z-20`}>
      <div className="alert bg-white text-gray-900">
        {toastMessage.status == 200 ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        )}
        <span>{toastMessage.message}</span>
      </div>
    </div>
    </>
  )
}

export default App
