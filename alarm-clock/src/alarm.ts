class Alarm {
    time: string;
    isActive: boolean;

    constructor() {
        this.time = '';
        this.isActive = false;
    }

    setAlarm(time: string) {
        this.time = time;
    }

    activate() {
        this.isActive = true;
    }

    deactivate() {
        this.isActive = false;
    }
}

export default Alarm;