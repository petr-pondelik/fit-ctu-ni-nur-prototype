export default class TimeUtils {

    /**
     * @param d
     */
    static formatDateCz(d: Date) {
        return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    }

    /**
     * @param d
     */
    static formatTimeCz(d: Date) {
        return d.toLocaleTimeString('cz-CZ', { hour12: false, hour: '2-digit', minute: '2-digit' });
    }

}