 // 1. createEmployeeRecord
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // 2. createEmployeeRecords
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  // 3. createTimeInEvent
  function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
  
    return employeeRecord;
  }
  
  // 4. createTimeOutEvent
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
  
    return employeeRecord;
  }
  
  // 5. hoursWorkedOnDate
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // 6. wagesEarnedOnDate
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // 7. allWagesFor
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, event) => {
      return totalWages + wagesEarnedOnDate(employeeRecord, event.date);
    }, 0);
  }
  
  // 8. calculatePayroll
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, record) => {
      return totalPayroll + allWagesFor(record);
    }, 0);
  }
  
