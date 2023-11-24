export default function convertTo12HourFormat(time24: string): string {
    const [hours, minutes] = time24.split(':');
    let period: 'AM' | 'PM' = 'AM';

    let hours12 = parseInt(hours, 10);

    if (hours12 >= 12) {
        period = 'PM';
        if (hours12 > 12) {
            hours12 -= 12;
        }
    }

    return `${hours12}:${minutes} ${period}`;
}