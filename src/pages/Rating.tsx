import { useEffect, useState } from "react"
import { BooktrackerAPI } from "../api/booktrackerApi"
import "../assets/styles/pages/rating.scss"
import Model1 from "../assets/images/leaderboard/medal-1.svg"
import Model2 from "../assets/images/leaderboard/medal-2.svg"
import Model3 from "../assets/images/leaderboard/medal-3.svg"
import { CloudImage } from "../components/CloudImage"

export interface IUser {
    id: string
    email: string
    phone: string
    fullName: string
    password: string
    birth: string
    gender: string
    genres: string[]
    createtime: string
    refreshToken: string
    lastLogin: string
    avatar: string
    followed: boolean
    time: number
}

export const Rating = () => {
    const [topTen, setTopTen] = useState<IUser[]>([])
    const { fetchData: fetchTopTenData } = BooktrackerAPI("top")

    useEffect(() => {
        fetchTopTenData({}).then((res) => {
            if (res.result_code === 0) {
                setTopTen(JSON.parse(JSON.stringify(res.data)))
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const spliteText = (text: string) => {
        return text.length <= 6 ? text : `${text.slice(0, 4)}...`
    }

    const timeText = (time: number) => {
        if (time < 10) {
            return `0${time}`
        } else {
            return time
        }
    }
    const timeConverter = (milliseconds: number) => {
        console.log(milliseconds)
        const hours = Math.floor(milliseconds / 3600000)
        const minutes = Math.floor((milliseconds % 3600000) / 60000)
        const seconds = Math.floor((milliseconds % 60000) / 1000)

        return `${timeText(hours)}:${timeText(minutes)}:${timeText(seconds)}`
    }

    const openUserProfile = (userId: string, followed: boolean) => {
        if (!userId) return

        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
                JSON.stringify({
                    key: "route",
                    data: {
                        name: "UserProfile",
                        params: {
                            id: userId,
                            isFollow: followed,
                        },
                    },
                }),
            )
        }
    }

    return (
        <div className="container rating">
            {topTen.length && (
                <div className="leaderBoard">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: 8,
                            backgroundColor: "#f5f5f5",
                            borderRadius: 8,
                            margin: "10px 0px",
                        }}>
                        <span className="header-text">The best results on Book tracker</span>
                    </div>
                    <div className="ratingBox">
                        <div className="topPosition">
                            {topTen.length >= 3 ? (
                                <div className="topUserBlock" onClick={() => openUserProfile(topTen[2].id, topTen[2].followed)}>
                                    <CloudImage url={topTen[2].avatar} className="avatar-img" isPreview={false} />
                                    <span className="topJPID">{spliteText(topTen[2].fullName)}</span>
                                    {topTen.length >= 3 && <p className="time-text">{timeConverter(topTen[2].time)}</p>}
                                </div>
                            ) : null}
                            <div className="topPositionBox" style={{ height: 50, backgroundColor: "#cd7f32" }}>
                                <img src={Model3} className="rateImg" />
                            </div>
                        </div>

                        <div className="topPosition">
                            {topTen.length >= 1 ? (
                                <div className="topUserBlock" onClick={() => openUserProfile(topTen[0].id, topTen[0].followed)}>
                                    <CloudImage url={topTen[0].avatar} className="avatar-img" isPreview={false} />
                                    <span className="topJPID">{topTen.length >= 1 ? spliteText(topTen[0].fullName) : ""}</span>
                                    {topTen.length >= 3 && <p className="time-text">{timeConverter(topTen[0].time)}</p>}
                                </div>
                            ) : null}
                            <div className="topPositionBox" style={{ height: 85, backgroundColor: "#e5b80b" }}>
                                <img src={Model1} className="rateImg" />
                            </div>
                        </div>

                        <div className="topPosition">
                            {topTen.length >= 2 ? (
                                <div className="topUserBlock" onClick={() => openUserProfile(topTen[1].id, topTen[1].followed)}>
                                    <CloudImage url={topTen[1].avatar} className="avatar-img" isPreview={false} />
                                    <span className="topJPID">{topTen.length >= 2 ? spliteText(topTen[1].fullName) : ""}</span>
                                    {topTen.length >= 3 && <p className="time-text">{timeConverter(topTen[1].time)}</p>}
                                </div>
                            ) : null}
                            <div className="topPositionBox" style={{ height: 65, backgroundColor: "silver" }}>
                                <img src={Model2} className="rateImg" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="rating-wrapper">
                {topTen
                    .slice(3, topTen.length)
                    .filter((item) => item.fullName.length)
                    .map((item, index) => (
                        <div key={item.id} className="rating-block" onClick={() => openUserProfile(item.id, item.followed)}>
                            <div>
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                                    <CloudImage url={item.avatar} className="userAvatar" isPreview={false} />
                                    <p className="userName">{item.fullName}</p>
                                </div>
                                <p style={{ marginLeft: 45, marginTop: -5 }}>{timeConverter(item.time)}</p>
                            </div>
                            <p className="userPositionNumber">🏅{index + 4}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}
