import { useContext } from "react"
import { ManagerContext } from "./contexts/manager"
import { EventsTheme, ManagerContextInterface } from "./types"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import ptbrLocale from '@fullcalendar/core/locales/pt-br';
import { eventsTheme } from "./types/colors"
import ModalEvent from "./components/ModalEvent"
import { formatDateToCalendar } from "./utils/timeManager"
import EventComponent from "./components/EventComponent"

function App() {

  const context  = useContext(ManagerContext)
  const { events, tags, showToast, toastMessage } = context as ManagerContextInterface

  function TagColorById(tag_id: string | undefined) : keyof EventsTheme{
    if(!tag_id) return 'default'
    const filteredTag = tags.filter(item => item.id == tag_id)
    console.log(filteredTag)
    return filteredTag[0].color
  }

/* 
  const localizer = momentLocalizer(moment)

  const MyCalendar = () => (
    <div className="myCustomHeight">
      <Calendar
        localizer={localizer}
        //events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
    

 */
  console.log(events, tags)
  return (
    <>
    <div className="h-screen w-screen p-4">
      <div className="h-14 flex">
        <h1 className="text-xl p-2"><span>Olá, </span><span className="font-bold"> Ruan</span></h1>
        <label className="input input-bordered flex items-center gap-2 ml-auto">
          <input type="text" className="grow" placeholder="Procurar" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn mx-1">Selcionar Tags</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {tags?.map(item => (
              <li><input type="checkbox" defaultChecked className="checkbox bg-white" />{item.name}</li>
            ))}
            <li><input type="checkbox" defaultChecked className="checkbox bg-white" /></li>
          </ul>
        </div>
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn mx-1">Criar</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><ModalEvent item={undefined} type="create"/></li>
            <li></li>
          </ul>
        </div>
        <div className="join mr-4">
          <input className="join-item btn" type="radio" name="options" aria-label="Mes" />
          <input className="join-item btn" type="radio" name="options" aria-label="Semana" />
          <input className="join-item btn" type="radio" name="options" aria-label="Dia" />
        </div>
      </div>
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
