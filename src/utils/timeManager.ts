export function convertDateTimeToEpoch(dateString: string): number {
    const dateObject = new Date(dateString);
    const epochTime = dateObject.getTime() / 1000;
    return epochTime;
}

export function convertEpochToDateTime(epochTime: number | undefined): string | undefined {
    if(!epochTime) return

    const dateObject = new Date(epochTime * 1000)
    const year = dateObject.getFullYear()
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2)
    const day = ("0" + dateObject.getDate()).slice(-2)
    const hours = ("0" + dateObject.getHours()).slice(-2)
    const minutes = ("0" + dateObject.getMinutes()).slice(-2)

    return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function formatDateToList(epoch: number | undefined) {
    if (!epoch) return

    const milliseconds = epoch * 1000;
    const date = new Date(milliseconds);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
}

export function formatDateToCalendar(epoch: number | undefined) {
    if (!epoch) return

    const milliseconds = epoch * 1000;
    const date = new Date(milliseconds);

    const year = date.getFullYear();
    
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}