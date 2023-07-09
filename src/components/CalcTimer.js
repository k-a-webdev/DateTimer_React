export default function CalcTimer(date) {
    const now = new Date();
    const dateInput = new Date(date).setHours(-2)
    const dateDiff =  new Date(now - dateInput).getTime()

    let s = Math.floor(Math.abs(dateDiff) / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24);

    s = s % 60
    m = m % 60
    h = h % 24

    if (s < 10) s = "0" + s
    if (m < 10) m = "0" + m
    if (h < 10) h = "0" + h


    localStorage.setItem('DateTimer', JSON.stringify(
        {
            days: d,
            hours: h,
            minutes: m,
            seconds: s,
            prevDate: date
        }
    ))
}