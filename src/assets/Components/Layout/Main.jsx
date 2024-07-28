import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import HeaderButton from "../Buttons/HeaderButton";
import axios from 'axios';
import ModalComponent from "../Modals/ModalComponent";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { SelectedStudentContext } from '../../../Provider/SelectedUserContext';
import DownloadButton from "../../Images/Download.svg";
import Papa from 'papaparse';

const Main = () => {
    const [students, setStudents] = useState([]);
    const [addStudent, setAddStudent] = useState(false);
    const [editStudent, setEditStudent] = useState(false);
    const { selectedStudent, setSelectedStudent } = useContext(SelectedStudentContext);
    const [viewStudent, setViewStudent] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const deleteModalRef = useRef(null);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/allstudents');
            setStudents(response.data);
        } catch (error) {
            console.error("There was an error fetching the students!", error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deletestudent/${id}`);
            fetchStudents();
            setShowDeleteModal(false);
        } catch (error) {
            console.error("There was an error deleting the student!", error);
        }
    };

    const handleAddOrEditStudent = async (newOrUpdatedStudent) => {
        setAddStudent(false);
        setEditStudent(false);
        fetchStudents();
    };

    const exportToCSV = () => {
        const csv = Papa.unparse(students, {
            header: true,
            columns: ['id', 'identifyNumber', 'firstName', 'lastName', 'universityAdmissionYear', 'graduationYear', 'status', 'school', 'program', 'email', 'voucher', 'grant', 'sociality', 'birthDate', 'birthCity', 'learningLanguage', 'freshmanOrTransfer', 'mobilitySemester', 'agent']
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'students.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOutsideClick = (e) => {
        if (deleteModalRef.current && !deleteModalRef.current.contains(e.target)) {
            setShowDeleteModal(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [addStudent, editStudent]);

    useEffect(() => {
        if (showDeleteModal) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showDeleteModal]);

    return (
        <Container>
            <Header>
                <FlexDiv className="leftSi">
                    <BackButton>&lt;</BackButton>
                    <HeaderButton children="ყველა სტუდენტი" />
                </FlexDiv>
                <FlexDiv className="rightSi">
                    <ExportButton onClick={exportToCSV}>
                        ექსპორტი
                        <img src={DownloadButton} style={{ marginBottom: 4, marginLeft: 11 }} alt="exportbutton" />
                    </ExportButton>
                    <HeaderButton
                        children="ახლის დამატება"
                        isAdd={true}
                        onClick={() => {
                            setAddStudent(true);
                            setSelectedStudent(null);
                        }}
                    />
                </FlexDiv>
            </Header>
            {addStudent && (
                <ModalComponent
                    onClose={() => setAddStudent(false)}
                    student={selectedStudent}
                    onSubmit={handleAddOrEditStudent}
                />
            )}
            {editStudent && (
                <ModalComponent
                    isEdit={editStudent}
                    onClose={() => setEditStudent(false)}
                    student={selectedStudent}
                    onSubmit={handleAddOrEditStudent}
                />
            )}
            {viewStudent && (
                <ModalComponent
                    isView={viewStudent}
                    onClose={() => setViewStudent(false)}
                    student={selectedStudent}
                />
            )}
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <Th>Options</Th>
                            <Th>პირადი N</Th>
                            <Th>კოდი</Th>
                            <Th>სახელი</Th>
                            <Th>გვარი</Th>
                            <Th>ჩაბ. წელი</Th>
                            <Th>დამთ. წელი</Th>
                            <Th>სტატუსი</Th>
                            <Th>სკოლა</Th>
                            <Th>პროგრამა</Th>
                            <Th>ელფოსტა</Th>
                            <Th>ვაუჩერი</Th>
                            <Th>გრანტი</Th>
                            <Th>მოქალაქეობა</Th>
                            <Th>დაბადების თარიღი</Th>
                            <Th>დაბადების ქალაქი</Th>
                            <Th>სწავლების ენა</Th>
                            <Th>Freshman / Transfer</Th>
                            <Th>მობილობის სემ კურსი</Th>
                            <Th>აგენტი</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id}>
                                <Td style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                                    <li>
                                        <OptionButton onClick={() => {
                                            setSelectedStudent(student);
                                            setEditStudent(true);
                                        }}>
                                            <FaEdit />
                                        </OptionButton>
                                    </li>
                                    <li>
                                        <OptionButton onClick={() => {
                                            setStudentToDelete(student.id);
                                            setShowDeleteModal(true);
                                        }}>
                                            <FaTrash />
                                        </OptionButton>
                                    </li>
                                    <li>
                                        <OptionButton>
                                            <FaEye
                                                onClick={() => {
                                                    setSelectedStudent(student);
                                                    setViewStudent(true);
                                                }}
                                            />
                                        </OptionButton>
                                    </li>
                                </Td>
                                <Td>{student.identifyNumber}</Td>
                                <Td>{student.id}</Td>
                                <Td>{student.firstName}</Td>
                                <Td>{student.lastName}</Td>
                                <Td>{student.universityAdmissionYear}</Td>
                                <Td>{student.graduationYear || 'N/A'}</Td>
                                <Td>{student.status || 'N/A'}</Td>
                                <Td>{student.school}</Td>
                                <Td>{student.program}</Td>
                                <Td>{student.email}</Td>
                                <Td>{student.voucher || 'N/A'}</Td>
                                <Td>{student.grant || 'N/A'}</Td>
                                <Td>{student.sociality || 'N/A'}</Td>
                                <Td>{student.birthDate.split('T')[0]}</Td>
                                <Td>{student.birthCity}</Td>
                                <Td>{student.learningLanguage || 'N/A'}</Td>
                                <Td>{student.freshmanOrTransfer}</Td>
                                <Td>{student.mobilitySemester || 'N/A'}</Td>
                                <Td>{student.agent || 'N/A'}</Td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>

            {showDeleteModal && (
                <Overlay>
                    <DeleteAcceptionModal ref={deleteModalRef}>
                        <FlexDiv style={{ justifyContent: 'space-between', marginBottom: '56px' }}>
                            <p style={{ color: '#104E8A', fontSize: '20px' }}>
                                ნამდვილად გსურთ სტუდენტის წაშლა ?
                            </p>
                            <span onClick={() => setShowDeleteModal(false)} style={{ cursor: 'pointer' }}>
                                X
                            </span>
                        </FlexDiv>

                        <FlexDiv>
                            <div onClick={() => deleteStudent(studentToDelete)} style={{ width: '296px', height: '55px', border: 'none', borderRadius: 10, backgroundColor: '#104E8A', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginRight: 10 }}>
                                კი
                            </div>
                            <div onClick={() => setShowDeleteModal(false)} style={{ width: '296px', height: '55px', border: 'none', borderRadius: 10, backgroundColor: 'rgb(141 193 239 / 15%)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                არა
                            </div>
                        </FlexDiv>
                    </DeleteAcceptionModal>
                </Overlay>
            )}
        </Container>
    );
};

const FlexDiv = styled.div`
    display: flex;
    align-items: center;
`;

const TableContainer = styled.div`
    margin-top: 20px;
    overflow-x: auto;

    &::-webkit-scrollbar {
        height: 12px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #e9e6e6;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #104E8A;
        border-radius: 10px;
        border: 2px solid #FFFFFF; 
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #0D3C6B;
    }
`;

const Container = styled.div`
    padding: 32px 80px;
    width: 100%;
    height: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const BackButton = styled.button`
    width: 36px;
    height: 36px;
    border: 1px solid rgba(17, 91, 164, 0.15);
    background-color: transparent;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #115BA4;
    padding: 0;
    margin-right: 16px;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background-color: transparent;
    font-size: 1.2rem; 
`;

const Th = styled.th`
    padding: 16px 24px; 
    color: #104E8A;
    text-align: left;
    font-size: 1.2rem; 
    white-space: nowrap; 
`;

const Td = styled.td`
    padding: 16px 24px; 
    text-align: left;
    color: #104E8A;
    font-size: 1.2rem; 
    background-color: transparent;
    white-space: nowrap; 

    &:nth-child(even) {
        background-color: transparent;
    }
`;

const OptionButton = styled.button`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #104E8A;

    &:hover {
        color: #0D3C6B;
    }
`;

const ExportButton = styled.div`
    width: 181px;
    height: 40px;
    background-color: white;
    color: #115BA4;
    border: 1px solid #115BA4;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-right: 16px;
`;
const DeleteAcceptionModal = styled.div`
    width: 648px;
    height: 190px;
    background-color: white;
    z-index: 1000;
    padding : 24px 25px;
    border-radius : 10px
    
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;




export default Main;
