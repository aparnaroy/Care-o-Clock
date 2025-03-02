/* eslint-disable @typescript-eslint/no-unused-vars */
// import logo from './assets/full-logo.png'
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface MedicationReminder {
    name: string;
    dose: string;
    frequency: string;
    filled_date: string;
    expiration_date: string;
    refills: number;
    amount: number;
    times_taken: number;
  }
  
  interface AppointmentReminder {
    name: string;
    doctor: string;
    datetime: string;
    location: string;
    notes: string;
  }
  
  interface Reminders {
    medication: MedicationReminder[];
    appointments: AppointmentReminder[];
  }
  

  const MyCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [view, setView] = useState("month");
  
    // Mock reminders data
    const [reminders] = useState<Reminders>({
      medication: [
        {
          name: "lisinopril",
          dose: "10mg",
          frequency: "once daily",
          filled_date: "2025-01-20",
          expiration_date: "2026-01-20",
          refills: 2,
          amount: 90,
          times_taken: 5,
        },
      ],
      appointments: [
        {
          name: "Annual Checkup",
          doctor: "Dr. Smith",
          datetime: "2025-03-15T09:00:00.000Z",
          location: "Acme Health Clinic",
          notes: "Fasting blood work required",
        },
      ],
    });
  
    const handleDateChange = (date: Date) => {
      setSelectedDate(date);
      setView("day");
    };
  
    const handlePrevDay = () => {
      const prevDay = new Date(selectedDate);
      prevDay.setDate(selectedDate.getDate() - 1);
      setSelectedDate(prevDay);
    };
  
    const handleNextDay = () => {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      setSelectedDate(nextDay);
    };
  
    const formattedDate = selectedDate.toISOString().split("T")[0];
  
    // Filter reminders by selected date
    const dayAppointments = reminders.appointments.filter(
      (appointment) => appointment.datetime.startsWith(formattedDate)
    );
  
    return (
      <div className="p-4">
        <h1 className="text-xl font-bold">Calendar</h1>
  
        {view === "day" ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button onClick={handlePrevDay}>Previous Day</button>
              <h2>{selectedDate.toDateString()}</h2>
              <button onClick={handleNextDay}>Next Day</button>
            </div>
            <button onClick={() => setView("month")}>Select Date</button>
            <h3>Appointments for {selectedDate.toDateString()}:</h3>
            <ul>
              {dayAppointments.length > 0 ? (
                dayAppointments.map((appointment, index) => (
                  <li key={index}>
                    {appointment.name} with {appointment.doctor} at{" "}
                    {appointment.location}
                  </li>
                ))
              ) : (
                <li>No appointments for this day.</li>
              )}
            </ul>
          </div>
        ) : (
          <div>
            <button onClick={() => setView("day")}>Back to Day View</button>
            <Calendar
              onClickDay={handleDateChange}
              value={selectedDate}
              maxDetail="month"
              minDetail="month"
            />
          </div>
        )}
      </div>
    );
  };

export default MyCalendar;
