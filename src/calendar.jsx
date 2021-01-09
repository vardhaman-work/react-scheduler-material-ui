import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import TableCell from "@material-ui/core/TableCell";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { withStyles } from "@material-ui/core/styles";
import classNames from "clsx";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Scheduler,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
} from "@devexpress/dx-react-scheduler-material-ui";

import "./App.scss";

const styles = (theme) => ({
  cell: {
    color: "#78909C!important",
    position: "relative",
    userSelect: "none",
    verticalAlign: "top",
    padding: 0,
    height: 100,
    "&:first-child": {
      borderLeft: "none",
    },
    "&:last-child": {
      paddingRight: 0,
    },
    "tr:last-child &": {
      borderBottom: "none",
    },
    "&:hover": {
      backgroundColor: "white",
    },
  },
  content: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
  },
  text: {
    padding: "0.5em",
    textAlign: "center",
  },
  sun: {
    color: "#FFEE58",
  },
  cloud: {
    color: "#90A4AE",
  },
  rain: {
    color: "#4FC3F7",
  },
  sunBack: {
    backgroundColor: "#FFFDE7",
  },
  cloudBack: {
    backgroundColor: "#ECEFF1",
  },
  rainBack: {
    backgroundColor: "#E1F5FE",
  },
  opacity: {
    opacity: "0.1",
  },
  appointment: {
    borderRadius: "10px",
    "&:hover": {
      opacity: 0.6,
    },
  },
  apptContent: {
    "&>div>div": {
      whiteSpace: "normal !important",
      lineHeight: 1.2,
    },
  },
  flexibleSpace: {
    flex: "none",
  },
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  tooltipContent: {
    padding: theme.spacing(3, 1),
    paddingTop: 0,
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    width: "400px",
  },
  tooltipText: {
    ...theme.typography.body2,
    display: "inline-block",
  },
  title: {
    ...theme.typography.h6,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  icon: {
    color: theme.palette.action.active,
    verticalAlign: "middle",
  },
  circle: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    verticalAlign: "super",
  },
  textCenter: {
    textAlign: "center",
  },
  dateAndTitle: {
    lineHeight: 1.1,
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
  container: {
    paddingBottom: theme.spacing(1.5),
  },
});

const schedulerData = [
  {
    startDate: "2021-01-01T09:45",
    endDate: "2021-01-01T11:00",
    title: "Meeting 01",
  },
  {
    startDate: "2021-01-04T12:00",
    endDate: "2021-01-04T13:30",
    title: "Meeting 02"
  },
  {
    startDate: "2021-01-05T12:00",
    endDate: "2021-01-05T13:30",
    title: "Meeting 03"
  }
];

const getDateFormat = (date) => {
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = String(date.getFullYear());
  return dd + "-" + mm + "-" + yyyy;
};

const isWeekend = date => {
  const day = date.getDay();
  return day === 0 || day === 6;
}

const CellBase = React.memo(
  ({ classes, startDate, formatDate, otherMonth }) => {
    const today = new Date();
    return (
      <TableCell
        className={classNames({
          [classes.cell]: true,
          [classes.opacity]: otherMonth,
        })}
      >
        <div className={`dateCell ${getDateFormat(today) == getDateFormat(startDate) ? "todayCell" : "" } ${isWeekend(startDate) ? "disable-date" : ""}`}>
          {formatDate(startDate, { day: "numeric" })}
        </div>
      </TableCell>
    );
  }
);

const TimeTableCell = withStyles(styles, { name: "Cell" })(CellBase);
const ButtonProps = withStyles(styles, {
  name: "Button",
})(({ classes, ...restProps }) => (
  <TodayButton.Button {...restProps} startIcon={<EventAvailableIcon />} />
));

const views = [{
  type: 'month',
  name: 'Numeric Mode',
  maxAppointmentsPerCell: 1
}];


const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    className={`appointment-cell ${classes.appointment}`}
  />
));

export default () => (
  <Container id="app-calender" className="my-4">
    <Paper>
      <Scheduler 
        data={schedulerData} 
        firstDayOfWeek={1} >
        <ViewState />
        <MonthView timeTableCellComponent={TimeTableCell} />
        <Toolbar />
        <DateNavigator />
        <TodayButton buttonComponent={ButtonProps} />
        <Appointments 
          appointmentComponent={Appointment}
        />
      </Scheduler>
    </Paper>
  </Container>
);
