import ActivityCalendar from "react-activity-calendar"
import { Header } from "../components/Header"
import dayjs from "dayjs"
import "../assets/styles/pages/statistics.scss"

export const Statistics = () => {
    const currentDate = dayjs()
    const monthName = currentDate.format("MMMM")
    const year = currentDate.format("YYYY")

    /**
     * @TODO add custom redner block for calendar
                    renderBlock={renderBlockCalendar}
     * 
     */
    // const renderBlockCalendar = (block: BlockElement, activity: Activity) => {
    //     return (
    //         <div style={{width: 30, height: 30, background: "#000"}}>
    //             {block}
    //             {JSON.stringify(activity)}
    //         </div>
    //     )
    // }

    return (
        <div className="container statistic">
            <Header title={`${monthName} ${year}`} isGoBack={false} />

            <div className="calendar">
                <ActivityCalendar
                    style={{ width: "100%" }}
                    blockMargin={10}
                    weekStart={1}
                    blockRadius={2}
                    blockSize={30}
                    showWeekdayLabels
                    hideMonthLabels
                    hideColorLegend
                    hideTotalCount
                    colorScheme="light"
                    theme={{
                        light: ["hsl(0, 0%, 92%)", "#005479"],
                    }}
                    data={[
                        {
                            count: 2,
                            date: "2023-06-14",
                            level: 1,
                        },
                        {
                            count: 16,
                            date: "2023-06-22",
                            level: 3,
                        },
                        {
                            count: 3,
                            date: "2023-07-05",
                            level: 1,
                        },
                        {
                            count: 10,
                            date: "2023-07-17",
                            level: 2,
                        },
                    ]}
                    fontSize={14}
                    maxLevel={4}
                />
            </div>

            <div className="result-wrapper">
                <p className="title-result">Result Overview 2023</p>

                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <div className="year-wrapper">
                        <p className="month-name">Jan</p>
                        <div className="progress-block">
                            <span className="progress"></span>
                        </div>
                    </div>

                    <div className="year-wrapper">
                        <p className="month-name">Jan</p>
                        <div className="progress-block">
                            <span className="progress"></span>
                        </div>
                    </div>

                    <div className="year-wrapper">
                        <p className="month-name">Jan</p>
                        <div className="progress-block">
                            <span className="progress"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
