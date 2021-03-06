import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {
    createAppointment,
    getAppointmentsByDateAndUser,
    parseAppointment,
    formatAppointmentLabel
} from '../services/appointmentsService';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { dateTimeFormats } from '../common/globalConstants';

const useStyles = makeStyles((theme) => ({
    hoursFormControl: {
        minWidth: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function BookAppointmentDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [hour, setHour] = React.useState('');
    const [freeHours, setFreeHours] = useState([]);

    const classes = useStyles();

    const fetchFreeHours = () => {
        getAppointmentsByDateAndUser(selectedDate, props.hairdresserId)
            .then(response => {
                setFreeHours(response.all_appointments.filter(a => a.free === 'true'));
            });
    }

    const handleChange = (event) => {
        setHour(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        fetchFreeHours();
    };

    const handleClickOpen = () => {
        setOpen(true);
        fetchFreeHours();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const resetState = () => {
        setSelectedDate(new Date());
        setHour('');
    }

    const bookAppointment = () => {
        const body = {
            date: format(selectedDate, dateTimeFormats.machine),
            ...parseAppointment(hour),
            hairdr_id: props.hairdresserId
        }

        createAppointment(body)
            .then(() => {
                toast.success('Your appointment was successfully booked!');
                handleClose();
                resetState();
            })
            .catch(err => {
                toast.error('Sorry, there was problem booking your appointment! Please, try again.');
            });
    }

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>Book</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Book appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please choose convenient date and time for your appointment.
                    </DialogContentText>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format={dateTimeFormats.defaultDate}
                                margin="normal"
                                id="date-picker-inline"
                                label="Select appointment date"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.hoursFormControl}>
                            <InputLabel id="demo-simple-select-helper-label">Hour</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={hour}
                                onChange={handleChange}
                            >
                                {freeHours.map((a, i) => (
                                    <MenuItem value={formatAppointmentLabel(a)} key={i}>{formatAppointmentLabel(a)}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>Select your convenient hour</FormHelperText>
                        </FormControl>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={bookAppointment} color="primary">
                        Book
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}