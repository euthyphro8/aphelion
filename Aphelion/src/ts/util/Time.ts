

class Time {
    static AddMinutes(date: Date, minutes: number) : Date {
        return new Date(date.getTime() + (minutes * 60000));
    }

    static MinutesFromNow(minutes: number): Date {
        return new Date(Date.now() + (minutes * 60000.0));
    }
}

export default Time;