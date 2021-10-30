export default class TimeUtils {

    /**
     * @param d
     */
    static formatDateCz(d: Date) {
        return d.toLocaleDateString('cz-CZ').replaceAll('/', '.');
    }

    /**
     * @param d
     */
    static formatTimeCz(d: Date) {
        return d.toLocaleTimeString('cz-CZ', { hour12: false, hour: '2-digit', minute: '2-digit' });
    }

}