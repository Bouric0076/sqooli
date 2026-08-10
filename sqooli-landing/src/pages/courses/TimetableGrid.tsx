import { useState } from 'react'
import { Plus } from 'lucide-react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAYS = ['Mon 28', 'Tue 29', 'Wed 30', 'Thu 31', 'Fri 1']
const ROWS = [
  ['lesson', 'lesson', 'allocate', 'unavailable', 'lesson'],
  ['break', 'break', 'break', 'break', 'break'],
  ['unavailable', 'unavailable', 'allocate', 'lesson', 'unavailable'],
  ['lesson', 'allocate', 'lesson', 'allocate', 'allocate'],
  ['allocate', 'lesson', 'unavailable', 'unavailable', 'allocate'],
  ['unavailable', 'allocate', 'unavailable', 'allocate', 'unavailable'],
  ['lesson', 'allocate', 'allocate', 'allocate', 'allocate'],
  ['unavailable', 'unavailable', 'allocate', 'unavailable', 'unavailable'],
  ['unavailable', 'unavailable', 'unavailable', 'unavailable', 'unavailable'],
]

type SlotKind = 'lesson' | 'allocate' | 'unavailable' | 'break'

function Slot({ kind, id, onAllocate }: { kind: SlotKind; id: string; onAllocate: (id: string) => void }) {
  if (kind === 'lesson') {
    return <div className="timetable-slot timetable-slot-lesson"><small>§301 | Maths | Program Name | Grade 6</small><span>Olivia Rhye</span><strong>Arithmetics 1</strong><small>60 min</small></div>
  }
  if (kind === 'break') return <div className="timetable-slot timetable-slot-break">Break</div>
  if (kind === 'unavailable') return <div className="timetable-slot timetable-slot-unavailable">unavailable</div>
  return <button type="button" className="timetable-slot timetable-slot-allocate" onClick={() => onAllocate(id)}><Plus size={13} /> Allocate Slot</button>
}

export default function TimetableGrid() {
  const [selectedMonth, setSelectedMonth] = useState('Mar')
  const [allocatedSlots, setAllocatedSlots] = useState<string[]>([])
  const [notice, setNotice] = useState('')

  const allocateSlot = (id: string) => {
    setAllocatedSlots(current => current.includes(id) ? current : [...current, id])
    setNotice('Slot allocated. Drag-and-drop rescheduling will be available when scheduling is connected.')
  }

  return (
    <section className="course-timetable" aria-labelledby="timetable-heading">
      <div className="timetable-toolbar">
        <div>
          <h2 id="timetable-heading">Allocate Slots</h2>
          <p>Click free slots to allocate. Drag and drop classes to reschedule.</p>
          <strong>28 Feb 2025 - 1 Mar 2025 <a href="#next-week">Next Week</a></strong>
        </div>
        <div className="timetable-months" aria-label="Select month">
          <button className="year-select" type="button">2025⌄</button>
          {MONTHS.map(month => <button key={month} type="button" aria-pressed={selectedMonth === month} className={selectedMonth === month ? 'active' : ''} onClick={() => setSelectedMonth(month)}>{month}</button>)}
        </div>
      </div>
      {notice && <p className="timetable-notice" role="status">{notice}</p>}

      <div className="timetable-scroll" role="region" aria-label="Weekly timetable" tabIndex={0}>
        <div className="timetable-grid">
          <div className="timetable-head timetable-time-head">Time</div>
          {DAYS.map((day, index) => <div className="timetable-head" key={day}><span>{day.split(' ')[0]}</span><strong className={index === 0 ? 'today' : ''}>{day.split(' ')[1]}</strong></div>)}
          {ROWS.map((row, rowIndex) => <div className="timetable-row" key={rowIndex}>
            <div className="timetable-time">{9 + rowIndex}:00-{10 + rowIndex}:00</div>
            {row.map((kind, cellIndex) => {
              const id = `${rowIndex}-${cellIndex}`
              const allocated = allocatedSlots.includes(id)
              return <Slot key={id} id={id} kind={allocated ? 'lesson' : kind as SlotKind} onAllocate={allocateSlot} />
            })}
          </div>)}
        </div>
      </div>
    </section>
  )
}
