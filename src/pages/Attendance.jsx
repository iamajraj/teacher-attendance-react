import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Calendar, DatePicker, Upload } from "antd";
import { toast, Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import { Lightbox } from "react-modal-image";

const Attendance = () => {
    const [user, setUser] = useState(null);
    const [attendance, setAttendance] = useState([]);
    const location = useLocation();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [modalImage, setModalImage] = useState(null);

    const inpRef = useRef();
    const textInpRef = useRef();

    const onSet = () => {
        const value = inpRef.current.value;
        if (!value || !selectedDate) {
            return toast("Date or number can't be empty.", {
                icon: "😐",
            });
        }

        let imgdata;
        if (selectedFile) {
            const fileReader = new FileReader();

            fileReader.onload = () => {
                imgdata = fileReader.result;

                setAttendance((prev) => [
                    ...prev,
                    {
                        date: selectedDate,
                        number: Number(inpRef.current.value),
                        text: textInpRef.current.value,
                        imageFile: selectedFile,
                        imageData: imgdata,
                    },
                ]);
            };

            fileReader.readAsDataURL(selectedFile);
        } else {
            setAttendance((prev) => [
                ...prev,
                {
                    date: selectedDate,
                    number: Number(inpRef.current.value),
                    text: textInpRef.current.value,
                    imageFile: selectedFile,
                    imageData: imgdata,
                },
            ]);
        }

        setSelectedFile(null);
        inpRef.current.value = "";
        textInpRef.current.value = "";

        toast("Attendance has been added!", {
            icon: "🚀",
        });
    };

    const renderDateCell = (value) => {
        let isSame = attendance.find((aten) => {
            const date = dayjs(aten.date);
            if (date.isSame(value.toISOString(), "day")) {
                return true;
            } else {
                return false;
            }
        });
        return (
            <div
                className={`w-full h-full flex justify-between relative p-1 gap-2 ${
                    isSame
                        ? isSame.number > 0
                            ? "bg-green-500"
                            : "bg-red-500"
                        : ""
                }`}
            >
                {isSame?.text && (
                    <p className="text-white text-[14px] flex-1">
                        {isSame.text}
                    </p>
                )}

                {isSame?.imageFile && (
                    <div className="flex-1 c-shadow -top-5 left-0 bg-white rounded-md">
                        <img
                            onClick={() => {
                                setModalImage(isSame?.imageData);
                            }}
                            src={isSame?.imageData}
                            className="w-full h-full object-cover rounded-md"
                            alt=""
                        />
                    </div>
                )}
            </div>
        );
    };

    useEffect(() => {
        setUser(location?.state);
    }, [location]);

    return user ? (
        <div className="py-3">
            <Toaster />
            {modalImage && (
                <Lightbox
                    medium={modalImage}
                    onClose={() => {
                        setModalImage(null);
                    }}
                />
            )}
            <div className="flex items-center gap-5 flex-col">
                <h1 className="text-[25px] flex items-center gap-3">
                    <UserOutlined />
                    {user.name}
                </h1>
                <div className="flex items-center flex-col gap-3">
                    <div className="space-x-4">
                        <DatePicker
                            onChange={(value) => {
                                setSelectedDate(value.toISOString());
                            }}
                        />
                        <input
                            ref={inpRef}
                            placeholder="Enter a number"
                            type="number"
                            className="border outline-none py-2 rounded-lg focus:ring-1 focus:ring-blue-500 px-2"
                        />
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="space-x-3">
                            <input
                                type="text"
                                className="border outline-none py-2 px-2 rounded-lg"
                                ref={textInpRef}
                                placeholder="Enter the text (optional)"
                            />
                            <Upload
                                beforeUpload={(file) => {
                                    setSelectedFile(file);
                                    return false;
                                }}
                                maxCount={1}
                                fileList={selectedFile ? [selectedFile] : null}
                                onRemove={(file) => {
                                    setSelectedFile(null);
                                }}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Select File (optional)
                                </Button>
                            </Upload>
                        </div>
                        <div className="space-x-2">
                            <Button onClick={onSet} type="primary">
                                Set
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Calendar dateCellRender={renderDateCell} />
        </div>
    ) : (
        <div>
            <h1>User not found</h1>
        </div>
    );
};

export default Attendance;
