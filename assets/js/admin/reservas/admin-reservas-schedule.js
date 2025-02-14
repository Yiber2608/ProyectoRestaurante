document.addEventListener("DOMContentLoaded", () => {
    initializeCalendars();
});

function initializeCalendars() {
    const branchCalendarEl = document.getElementById('branchCalendar');

    const branchCalendar = new FullCalendar.Calendar(branchCalendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        events: existingDates.map(date => ({
            start: date,
            allDay: true,
            backgroundColor: 'lightgreen',
            borderColor: 'lightgreen'
        })),
        select: function(info) {
            const startDate = info.startStr;
            const endDate = new Date(info.endStr);
            endDate.setDate(endDate.getDate() - 1); // Ajustar la fecha final para no incluir el día siguiente
            const dates = getDatesInRange(startDate, endDate.toISOString().split('T')[0]);
            const newDates = dates.filter(date => !existingDates.includes(date));
            if (newDates.length > 0) {
                selectedDates.push(...newDates);
                newDates.forEach(date => {
                    info.view.calendar.addEvent({
                        start: date,
                        allDay: true,
                        backgroundColor: 'lightgreen',
                        borderColor: 'lightgreen'
                    });
                });
                Swal.fire({
                    title: 'Confirmar selección',
                    text: `¿Deseas reservar las siguientes fechas: ${newDates.join(', ')}?`,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, reservar',
                    cancelButtonText: 'Cancelar'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await saveSchedules(newDates);
                    }
                });
            }
        },
        dateClick: function(info) {
            loadDaySchedule(info.dateStr);
        }
    });

    branchCalendar.render();
}

// Eliminar la lógica del calendario por horas
// ...rest of existing code...

function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

async function loadDaySchedule(date) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8080/api/v1/schedules/branch/${selectedBranchId}/date/${date}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok && data.success) {
            renderReservations(data.data);
        } else {
            handleError(`Error en la respuesta: ${data.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error al cargar los horarios del día:', error);
        handleError('Error al cargar los horarios del día. Por favor, intente nuevamente.');
    }
}

function renderReservations(schedule) {
    const container = document.getElementById('dayScheduleCalendar');
    container.innerHTML = '';

    if (!schedule) {
        container.innerHTML = `
            <div class="no-selection">
                <h2>Seleccione una fecha para ver las reservas</h2>
                <p>Por favor, seleccione una fecha en el calendario para ver las reservas correspondientes.</p>
            </div>
        `;
        return;
    }

    const totalCapacity = schedule.capacity;
    let reservedCount = 0;

    for (let hour = 12; hour <= 22; hour++) {
        const reservation = schedule[`hour${hour}Reservation`];
        if (reservation) {
            reservedCount += reservation.numPeople;
        }
    }

    const remainingCapacity = totalCapacity - reservedCount;

    const header = document.createElement('div');
    header.className = 'd-flex justify-content-between align-items-center mb-3';
    header.innerHTML = `
        <h5 class="mb-0">Horario del ${schedule.date}</h5>
        <p class="mb-0">Capacidad: ${remainingCapacity}/${totalCapacity}</p>
        <button class="btn btn-danger btn-sm float-end" onclick="deleteSchedule(${schedule.id}, '${schedule.date}')">
            <i class="bi bi-trash"></i>
        </button>
    `;
    container.appendChild(header);

    for (let hour = 12; hour <= 22; hour++) {
        const reservation = schedule[`hour${hour}Reservation`];
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = reservation ? `
            <div class="card-body">
                <h5 class="card-title">Reserva a las ${hour}:00</h5>
                <p class="card-text">Nombre: ${reservation.userName}</p>
                <p class="card-text">Personas: ${reservation.numPeople}</p>
                <p class="card-text">Estado: ${reservation.status}</p>
                <button class="btn btn-success" onclick="approveReservation(${reservation.id})">Aprobar</button>
                <button class="btn btn-danger" onclick="cancelReservation(${reservation.id})">Cancelar</button>
            </div>
        ` : `
            <div class="card-body">
                <h5 class="card-title">Reserva a las ${hour}:00</h5>
                <p class="card-text">No hay reservas</p>
            </div>
        `;
        container.appendChild(card);
    }
}

async function approveReservation(reservationId) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8080/api/v1/reservations/${reservationId}/approve`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok && data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Reserva aprobada',
                text: 'La reserva ha sido aprobada exitosamente.',
                showConfirmButton: true
            });
            loadDaySchedule(new Date().toISOString().split('T')[0]);
        } else {
            handleError(`Error en la respuesta: ${data.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error al aprobar la reserva:', error);
        handleError('Error al aprobar la reserva. Por favor, intente nuevamente.');
    }
}

async function cancelReservation(reservationId) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8080/api/v1/reservations/${reservationId}/cancel`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok && data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Reserva cancelada',
                text: 'La reserva ha sido cancelada exitosamente.',
                showConfirmButton: true
            });
            loadDaySchedule(new Date().toISOString().split('T')[0]);
        } else {
            handleError(`Error en la respuesta: ${data.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error al cancelar la reserva:', error);
        handleError('Error al cancelar la reserva. Por favor, intente nuevamente.');
    }
}

async function deleteSchedule(scheduleId, scheduleDate) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8080/api/v1/schedules/${scheduleId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.ok && data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Horario eliminado',
                text: 'El horario ha sido eliminado exitosamente.',
                showConfirmButton: true
            });
            // Actualizar el estado visual
            const cell = document.querySelector(`.fc-daygrid-day[data-date="${scheduleDate}"]`);
            if (cell) {
                cell.style.backgroundColor = '';
            }
            
            existingDates = existingDates.filter(date => date !== scheduleDate);
            renderReservations(null);
            loadBranchCalendar(selectedBranchId);
        } else {
            handleError(`Error en la respuesta: ${data.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error al eliminar el horario:', error);
        handleError('Error al eliminar el horario. Por favor, intente nuevamente.');
    }
}

async function saveSchedules(dates) {
    const token = localStorage.getItem('token');
    const scheduleData = {
        branchId: selectedBranchId,
        dates: dates
    };
    console.log('Datos a enviar:', scheduleData);

    try {
        const response = await fetch('http://localhost:8080/api/v1/schedules/bulk', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(scheduleData)
        });
        const data = await response.json();
        if (response.ok && data.success) {
            Swal.fire({
                icon: 'success',
                title: 'Horarios guardados',
                text: 'Los horarios han sido guardados exitosamente.',
                showConfirmButton: true
            });
            loadBranchCalendar(selectedBranchId);
        } else {
            handleError(`Error en la respuesta: ${data.message || 'Error desconocido'}`);
        }
    } catch (error) {
        console.error('Error al guardar los horarios:', error);
        handleError('Error al guardar los horarios. Por favor, intente nuevamente.');
    }
}

function handleError(message) {
    console.error(message);
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        showConfirmButton: true
    });
}
