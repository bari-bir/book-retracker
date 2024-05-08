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

    return (
        <div className="container rating">
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
                        <div className="topUserBlock">
                            <CloudImage url={topTen[2].avatar} className="avatar-img" />
                            <span className="topJPID">{topTen.length >= 3 ? topTen[2].fullName : ""}</span>
                        </div>
                        <div className="topPositionBox" style={{ height: 50, backgroundColor: "#cd7f32" }}>
                            <img src={Model3} className="rateImg" />
                        </div>
                    </div>

                    <div className="topPosition">
                        <div className="topUserBlock">
                            <CloudImage url={topTen[0].avatar} className="avatar-img" />
                            <span className="topJPID">{topTen.length >= 1 ? topTen[0].fullName : ""}</span>
                        </div>
                        <div className="topPositionBox" style={{ height: 85, backgroundColor: "#e5b80b" }}>
                            <img src={Model1} className="rateImg" />
                        </div>
                    </div>

                    <div className="topPosition">
                        <div className="topUserBlock">
                            <CloudImage url={topTen[1].avatar} className="avatar-img" />
                            <span className="topJPID">{topTen.length >= 2 ? topTen[1].fullName : ""}</span>
                        </div>
                        <div className="topPositionBox" style={{ height: 65, backgroundColor: "silver" }}>
                            <img src={Model2} className="rateImg" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="rating-wrapper">
                {topTen
                    .slice(3, topTen.length)
                    .filter((item) => item.fullName.length)
                    .map((item, index) => (
                        <div key={item.id} className="rating-block">
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <CloudImage url={item.avatar} className="userAvatar" />
                                <p className="userName">{item.fullName}</p>
                            </div>
                            <p className="userPositionNumber">{index + 4}</p>
                        </div>
                    ))}
            </div>
        </div>
    )
}
