import { CloudUploadOutlined } from "@ant-design/icons"
import { Header } from "../components/Header"
import "../assets/styles/pages/createBook.scss"
import { InputStyle } from "../components/InputStyle"
import { Button, Input, Select } from "antd"
import { useLocation } from "react-router-dom"

export const CreateBook = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const statusType = queryParams.get("status")

    return (
        <div className="container create-book">
            <Header title="Add a book" />

            <div className="dragger">
                <div className="dragger-wrapper">
                    <div className="upload-icon">
                        <CloudUploadOutlined className="upload-icon" />
                        <p className="upload-text">Click here to upload</p>
                    </div>
                </div>
            </div>

            <div className="input-wrapper">
                <InputStyle labelText="Title">
                    <Input placeholder="name of book" className="input" />
                </InputStyle>
                <InputStyle labelText="Author">
                    <Input placeholder="author of book" className="input" />
                </InputStyle>
                <InputStyle labelText="Status">
                    <Select
                        placeholder="status of book"
                        defaultValue={statusType}
                        style={{ width: 120 }}
                        options={[
                            { value: "Reading", label: "Reading" },
                            { value: "Read Later", label: "Read Later" },
                            { value: "Read", label: "Read" },
                        ]}
                    />
                </InputStyle>
                <InputStyle labelText="Page">
                    <Input placeholder="type  a  message here ..." type="number" className="input" />
                </InputStyle>

                <Button type="primary" className="btn-save">
                    Save
                </Button>
            </div>
        </div>
    )
}
