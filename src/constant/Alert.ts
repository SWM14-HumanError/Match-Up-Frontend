let alertQueue: string[] = [];
let prevAlert: string = '';
let prevAlertTime: Date = new Date('1970-01-01');
let alerting = false;

const Alert = {
  show: (message: string) => {
    alertQueue.push(message);

    if (!alerting)
      Alert.alert();
  },
  alert: () => {
    if (alertQueue.length === 0) {
      alerting = false;
      return;
    }

    alerting = true;
    const nowAlert = alertQueue.shift() as string;
    if (prevAlert !== nowAlert || new Date().getTime() - prevAlertTime.getTime() > 500) {
      prevAlert = nowAlert;

      alert(prevAlert);
      prevAlertTime = new Date();
    }

    if (alertQueue.length > 0)
      Alert.alert();

    alerting = false;
  }
}

export default Alert;