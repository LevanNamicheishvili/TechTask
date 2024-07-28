import React, { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { SelectedStudentContext } from "../../../Provider/SelectedUserContext";

const ModalComponent = ({ isEdit, isView, onClose }) => {
    const modalRef = useRef();
    const { selectedStudent } = useContext(SelectedStudentContext);
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        identifyNumber: "",
        universityAdmissionYear: "",
        birthDate: "",
        birthCity: "",
        school: "",
        program: "",
        voucher: "",
        grant: "",
        sociality: "",
        learningLanguage: "",
        freshmanOrTransfer: "",
        mobilitySemester: "",
        agent: "",
        email: "",
    });




    useEffect(() => {
        if (isEdit || isView    && selectedStudent) {
            const formatDate = (dateString) => {
                const date = new Date(dateString);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
    
            setFormData({
                firstName: selectedStudent.firstName || "",
                lastName: selectedStudent.lastName || "",
                identifyNumber: selectedStudent.identifyNumber || "",
                universityAdmissionYear: selectedStudent.universityAdmissionYear || "",
                birthDate: selectedStudent.birthDate ? formatDate(selectedStudent.birthDate) : "",
                birthCity: selectedStudent.birthCity || "",
                school: selectedStudent.school || "",
                program: selectedStudent.program || "",
                voucher: selectedStudent.voucher || "",
                grant: selectedStudent.grant || "",
                sociality: selectedStudent.sociality || "",
                learningLanguage: selectedStudent.learningLanguage || "",
                freshmanOrTransfer: selectedStudent.freshmanOrTransfer || "",
                mobilitySemester: selectedStudent.mobilitySemester || "",
                agent: selectedStudent.agent || "",
                email: selectedStudent.email || "",
            });
        }
    }, [isEdit, selectedStudent]);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isEdit) {
                const response = await axios.put(`http://localhost:5000/editstudent/${selectedStudent.id}`, formData);
                console.log(response.data);
            } else {
                const response = await axios.post('http://localhost:5000/addstudent', formData);
                console.log(response.data);
            }
            onClose();
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };


    return (
        <Overlay>
            <ModalWrapper ref={modalRef}>
                <ModalHeader>
                    <Title>{isEdit ? "რედაქტირება" : "ახლის დამატება"}</Title>
                    <CloseButton onClick={onClose}>X</CloseButton>
                </ModalHeader>
                <form onSubmit={handleSubmit}>
                    <ModalContent>
                        <LeftSideContent>
                            <Label>სახელი:</Label>
                            <Input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="სახელი"
                            />
                            <Label>გვარი:</Label>
                            <Input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="გვარი"
                            />
                            <Label>პირადი ნომერი:</Label>
                            <Input
                                type="text"
                                name="identifyNumber"
                                value={formData.identifyNumber}
                                onChange={handleInputChange}
                                placeholder="პირადი ნომერი"
                            />
                            <Label>ჩაბარების წელი:</Label>
                            <Input
                                type="number"
                                name="universityAdmissionYear"
                                value={formData.universityAdmissionYear}
                                onChange={handleInputChange}
                                placeholder="ჩაბარების წელი"
                            />
                            <Label>დაბადების თარიღი:</Label>
                            <Input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                            />
                            <Label>დაბადების ქალაქი:</Label>
                            <Input
                                type="text"
                                name="birthCity"
                                value={formData.birthCity}
                                onChange={handleInputChange}
                                placeholder="დაბადების ქალაქი"
                            />
                            <Label>სკოლა:</Label>
                            <Input
                                type="text"
                                name="school"
                                value={formData.school}
                                onChange={handleInputChange}
                                placeholder="სკოლა"
                            />
                            <Label>პროგრამა:</Label>
                            <Input
                                type="text"
                                name="program"
                                value={formData.program}
                                onChange={handleInputChange}
                                placeholder="პროგრამა"
                            />
                        </LeftSideContent>
                        <RightSideContent>
                            <Label>ვაუჩერი:</Label>
                            <Input
                                type="text"
                                name="voucher"
                                value={formData.voucher}
                                onChange={handleInputChange}
                                placeholder="ვაუჩერი"
                            />
                            <Label>გრანტი:</Label>
                            <Input
                                type="text"
                                name="grant"
                                value={formData.grant}
                                onChange={handleInputChange}
                                placeholder="გრანტი"
                            />
                            <Label>სოციალური სტატუსი:</Label>
                            <Input
                                type="text"
                                name="sociality"
                                value={formData.sociality}
                                onChange={handleInputChange}
                                placeholder="სოციალური სტატუსი"
                            />
                            <Label>სწავლის ენა:</Label>
                            <Input
                                type="text"
                                name="learningLanguage"
                                value={formData.learningLanguage}
                                onChange={handleInputChange}
                                placeholder="სწავლის ენა"
                            />
                            <Label>Freshman / Transfer:</Label>
                            <Select
                                name="freshmanOrTransfer"
                                value={formData.freshmanOrTransfer}
                                onChange={handleInputChange}
                            >
                                <Option value="">აირჩიეთ</Option>
                                <Option value="Freshman">Freshman</Option>
                                <Option value="Transfer">Transfer</Option>
                            </Select>
                            <Label>მობილობის სემესტრი:</Label>
                            <Input
                                type="text"
                                name="mobilitySemester"
                                value={formData.mobilitySemester}
                                onChange={handleInputChange}
                                placeholder="მობილობის სემესტრი"
                            />
                            <Label>აგენტი:</Label>
                            <Input
                                type="text"
                                name="agent"
                                value={formData.agent}
                                onChange={handleInputChange}
                                placeholder="აგენტი"
                            />
                            <Label>ელ-ფოსტა:</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="ელ-ფოსტა"
                            />
                        </RightSideContent>
                    </ModalContent>
                    {isView ? null : 
                     <AddButton type="submit">
                        
                     {isEdit ? "რედაქტირება" : "დამატება"}
                 </AddButton>
                    }
                  
                </form>
            </ModalWrapper>
        </Overlay>
    );
};

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: #104E8A;
`;

const ModalContent = styled.div`
    display: flex;
    gap: 20px;
`;

const LeftSideContent = styled.div`
    width: 50%;
`;

const RightSideContent = styled.div`
    width: 50%; 
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #104E8A;
`;

const Input = styled.input`
    width: 292px;
    height: 48px;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #115BA4;
    border-radius: 4px;
`;

const Select = styled.select`
    width: 292px;
    height: 48px;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #115BA4;
    border-radius: 4px;
    background-color: transparent;
`;

const Option = styled.option`
    padding: 8px;
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

const ModalWrapper = styled.div`
    width: 648px;
    height: 880px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
`;

const AddButton = styled.button`
    width: 100%;
    height: 48px;
    background-color: #115BA4;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
`;

export default ModalComponent;