import React from "react";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";

const Teachers = () => {
    return (
        <div className="mt-10">
            <TeacherTable />
        </div>
    );
};

export default Teachers;

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
                <a className="text-red-500">Delete</a>
            </Space>
        ),
    },
];

const data = [
    {
        id: "1",
        name: "John Brown",
        username: "john_brown",
        email: "john@gmail.com",
    },
    {
        id: "2",
        name: "John Brown",
        username: "john_brown",
        email: "john@gmail.com",
    },
    {
        id: "3",
        name: "John Brown",
        username: "john_brown",
        email: "john@gmail.com",
    },
];

const TeacherTable = () => <Table columns={columns} dataSource={data} />;
