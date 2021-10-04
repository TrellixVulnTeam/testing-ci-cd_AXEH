import React, {Fragment, useContext, useEffect, useState} from 'react';
import TheAvatar from './TheAvatar';
import StudentDrawerForm from "./StudentDrawerForm";
import {
    Table, Spin, Empty, Button, Badge, Tag, Popconfirm
} from 'antd';
import {
    LoadingOutlined, PlusOutlined, DeleteOutlined, EditOutlined,
} from '@ant-design/icons';
import AlertContext from '../context/alerts/alertContext';
import {DrawerContext} from '../context/drawer/DrawerState';



import StudentContext from '../context/students/studentContext';

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

const StudentsList = () => {

    const studentContenxt = useContext(StudentContext);
    const { students, loading, getAllStudents, deleteStudent} = studentContenxt;

    const alertContext = useContext(AlertContext);
    const { successNotification } = alertContext;

    const drawerContext = useContext(DrawerContext);
    const {showDrawer, setShowDrawer} = drawerContext;
    /**
     * useEffect sin dependencias: Carga cuando el componente
     *      es cargado
     */
    useEffect(() => {
        console.log("Component is mounted");
        getAllStudents();
    }, []);

     

    const onDeleteClickYes = (student) =>{
        console.log(student);
        deleteStudent(student.id)
        
    }
    const onDeleteClickNo = (student) =>{
        console.log(student);
    }

    const columns = [
        {
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, student) => <TheAvatar name={student.name}/>
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Buttons',
            dataIndex: 'buttons',
            key: 'buttons',
            render: (text, student) => (
                <Fragment>
                    <Button.Group>
                        <Popconfirm
                            title={`Are you sure to delete ${student.name}?`}
                            onConfirm={() =>onDeleteClickYes(student)}
                            onCancel={() =>{
                                onDeleteClickNo(student)
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                size={'small'}>
                                Delete
                            </Button>
                        </Popconfirm>
                        <Button
                            type="secondary"
                            icon={<EditOutlined />}
                            size={'small'}>
                            Edit
                        </Button>
                    </Button.Group>
                </Fragment>
            )
        },
    ];


    if (loading) {
        return <Spin indicator={antIcon}/>
    }
    if (students.length <= 0) {
        return <>
            <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size={'small'}>
                    Add New Student
                </Button>
            <StudentDrawerForm />
            <Empty/>
        </>;
    }
    return <>
        <StudentDrawerForm />
        <Table
            dataSource={students}
            columns={columns}
            bordered
            title={() => (<div>
                <Tag style={{marginLeft: '10px'}}>Number of students</Tag>
                <Badge count={students.length} className="site-badge-count-4" />
                <br/><br/>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size={'small'}>
                    Add New Student
                </Button>
            </div>)}
            pagination={{pageSize: 50}}
            scroll={{y: 500}}
            rowKey={(students) => students.id}
        />
    </>;
}

export default StudentsList
