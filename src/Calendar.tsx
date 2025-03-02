/* eslint-disable @typescript-eslint/no-unused-vars */
// import logo from './assets/full-logo.png'
import axios from "axios";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  medications: MedicationReminder[];
  appointments: AppointmentReminder[];
}

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");

  const [reminders, setReminders] = useState<Reminders | null>(null);
  const API_URL =
    import.meta.env.VITE_API_URL || "https://care-o-clock.up.railway.app";

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("❌ No token found, user not logged in.");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReminders(response.data.reminders);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setReminders(null); // Ensures UI updates even if the request fails
      }
    };

    fetchUser();
  }, [API_URL]);

  // Mock reminders data
  // const [reminders] = useState<Reminders>({
  //   medications: [
  //     {
  //       name: "lisinopril",
  //       dose: "10mg",
  //       frequency: "once daily",
  //       filled_date: "2025-01-20",
  //       expiration_date: "2026-01-20",
  //       refills: 2,
  //       amount: 90,
  //       times_taken: 5,
  //     },
  //   ],
  //   appointments: [
  //     {
  //       name: "Annual Checkup",
  //       doctor: "Dr. Smith",
  //       datetime: "2025-03-15T09:00:00.000Z",
  //       location: "Acme Health Clinic",
  //       notes: "Fasting blood work required",
  //     },
  //   ],
  // });

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

  // Filter prescriptions by selected date
  const dayMedications =
    reminders?.medications?.filter(
      (medication) =>
        new Date(medication.filled_date) <= new Date(formattedDate) &&
        new Date(formattedDate) <= new Date(medication.expiration_date)
    ) ?? [];

  // Filter appointments by selected date
  const dayAppointments =
    reminders?.appointments?.filter((appointment) =>
      appointment.datetime.startsWith(formattedDate)
    ) ?? [];

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
            {dayAppointments &&
            dayMedications &&
            (dayAppointments.length > 0 || dayMedications.length > 0) ? (
              <>
                {/* Render Appointments */}
                {dayAppointments.map((appointment, index) => (
                  <li key={`appointment-${index}`}>
                    {appointment.name} with {appointment.doctor} at{" "}
                    {appointment.location}
                  </li>
                ))}

                {/* Render Medications */}
                {dayMedications.map((medication, index) => (
                  <li key={`medication-${index}`}>
                    Take {medication.name} ({medication.dose}) -{" "}
                    {medication.frequency}
                  </li>
                ))}
              </>
            ) : (
              <li>No appointments or medications for this day.</li>
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
