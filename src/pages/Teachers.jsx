import React, { useState } from "react";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

const teachers = [
    {
        id: "1",
        name: "John Brown",
        username: "john_brown",
        email: "john@gmail.com",
    },
    {
        id: "2",
        name: "Alex Smith",
        username: "alex_smith",
        email: "alex@gmail.com",
    },
    {
        id: "3",
        name: "James Bond",
        username: "james_bond",
        email: "james@gmail.com",
    },
];

const Teachers = () => {
    const [data, setData] = useState(teachers);

    const removeTeacher = (id) => {
        setData((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <div className="mt-10">
            <TeacherTable data={data} removeTeacher={removeTeacher} />
        </div>
    );
};

export default Teachers;

const TeacherTable = ({ data, removeTeacher }) => {
    const { confirm } = Modal;

    const showDeleteConfirm = (id) => {
        confirm({
            title: "Are you sure delete this teacher?",
            icon: <ExclamationCircleFilled />,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                removeTeacher(id);
            },
        });
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/attendance/${record.id}`} state={record}>
                        View
                    </Link>
                    <a
                        className="text-red-500"
                        onClick={() => {
                            showDeleteConfirm(record.id);
                        }}
                    >
                        Delete
                    </a>
                </Space>
            ),
        },
    ];
    return <Table columns={columns} dataSource={data} />;
};
