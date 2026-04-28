import { createContext, useContext, useState } from "react";

const AdmissionContext = createContext();

export const AdmissionProvider = ({ children }) => {
  const [course, setCourse] = useState("");
  const [admission, setAdmission] = useState([]);
  const [address, setAddress] = useState("");

  const [isDltAdmissionOpen, setIsDltAdmissionOpen] = useState(false);
  const [isEditAdmissionOpen, setIsEditAdmissionOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [editCourse, setEditCourse] = useState("");
  const [editAddress, setEditAddress] = useState("");
  return (
    <AdmissionContext.Provider
      value={{
        course,
        setCourse,
        address,
        setAddress,
        admission,
        setAdmission,
        isDltAdmissionOpen,
        setIsDltAdmissionOpen,
        isEditAdmissionOpen,
        setIsEditAdmissionOpen,
        selectedId,
        setSelectedId,editCourse, setEditCourse,editAddress, setEditAddress
      }}
    >
      {children}
    </AdmissionContext.Provider>
  );
};
export const useAdmissionContext = () => useContext(AdmissionContext);
