import moment from "moment";
export function formatUTCDate(utcDate) {
    const date = new Date(utcDate);
    const formattedDate = date.toISOString().split('T')[0];
    const localFormattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return localFormattedDate;
}

export function formatDate(date,currentFormat,expectedFormat) {
    return moment(date,currentFormat).format(expectedFormat);
}