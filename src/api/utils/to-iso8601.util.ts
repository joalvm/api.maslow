export default function toIso8601(date?: Date) {
    const isoString = (date || new Date()).toISOString();
    const onlyDate = isoString.split('T')[0];
    const onlyTimeWithOutMilliseconds = isoString.split('T')[1].split('.')[0];

    return `${onlyDate}T${onlyTimeWithOutMilliseconds}+00:00`;
}
