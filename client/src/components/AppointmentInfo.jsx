import React from 'react'
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';
import { dateTimeFormats } from '../common/globalConstants'
import { trimSeconds } from '../common/helper-functions';

export default function AppointmentInfo({ appointment }) {
    return (
        <>
            <Typography gutterBottom variant="h5" component="h2">
                {`${appointment.user.firstName} ${appointment.user.lastName} - ${appointment.user.username}`}
            </Typography>
            <Typography variant="body2" component="p">
                {format(new Date(appointment.date), dateTimeFormats.defaultDate)} from {trimSeconds(appointment.start)} to {trimSeconds(appointment.end)}
            </Typography>
            <Typography variant="body2" component="p">
                Phone: {appointment.user.phone}
            </Typography>
        </>
    )
}