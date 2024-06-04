import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import axios from "axios";

import Logo from "../../assets/Icon1.png";
import { FaPrint } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const ContractModal = ({ setContractModal, setSign, requestInfos }) => {
  const [isCheckboxDisabled, setCheckboxDisabled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const printRef = useRef();

  const handleProceed = async () => {
    if (!isChecked) {
      toast.error("Please read and accept the contract");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      await axios.patch(
        `https://quircom.onrender.com/api/request/contractC/${requestInfos._id}`,
        {},
        { headers }
      );
      setCheckboxDisabled(true);
      toast.success("Contract has been successfully updated!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        setContractModal(false);
      }, 2000);
    } catch (error) {
      console.error("Error updating contract status:", error);
      toast.error("Failed to update contract status");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Decemeber",
    ];
    const formattedDate = `${monthNames[date.getMonth()]} ${date
      .getDate()
      .toString()
      .padStart(2, "0")}, ${date.getFullYear()}`;
    return formattedDate;
  };

  console.log("RAR:", requestInfos);
  return (
    <div className="fixed inset-0 z-1 flex flex-col items-center bg-black bg-opacity-[0.30]">
      <div className="max-w-[980px] min-h-[400px] my-20">
        <div className="h-[350px] overflow-y-auto">
          <div
            className="flex justify-center items-center bg-white px-4 py-16 rounded-tl-md"
            ref={printRef}
          >
            <div className=" whitespace-wrap w-[90%] border-[2px] border-[#1D5B79] rounded-lg p-4 text-justify">
              <div className="flex justify-center items-center mr-10 mb-6">
                <img src={Logo} className="h-28" />
              </div>
              <h1 className="text-center font-extrabold text-xl">
                Project Contract
              </h1>
              <br />
              <div>
                <h2 className="font-medium mb-1 uppercase">
                  <b>Project Details</b>
                </h2>
                <p>
                  Title: <b>{requestInfos.taskTitle}</b>
                  <br />
                  Description: {requestInfos.taskDetails}
                  <br />
                  Deadline: <b>{formatDate(requestInfos.deadLine)} </b>
                </p>
              </div>
              <p>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;This agreement outlines the terms and
                conditions between the Client and the Freelancer for the
                specified project. Both parties agree to the following terms:
                <br />
                <br />
              </p>
              <ol className="px-14 text-sm">
                <li>
                  1. Scope of Work The Freelancer agrees to perform the tasks
                  outlined in the Project Description and deliver the Project
                  Deliverables by the Project Deadline.
                </li>
                <li>
                  2. Payment Terms Total Payment: Payment Schedule:
                  <b> 15%</b> of <b>{requestInfos.serviceId.price}</b> upon
                  signing of the contract and <b>85%</b> upon final delivery and
                  approval by the Client.
                </li>
                <li>
                  3. Revisions The Freelancer agrees to provide up to 3
                  revisions based on the Client's feedback. Additional revisions
                  may be subject to extra charges.
                </li>
                <li>
                  4. Confidentiality Both parties agree to keep all
                  project-related information confidential, including
                  proprietary information, client data, and project details.
                </li>
                <li>
                  5. Ownership and Rights Upon full payment, the Freelancer
                  transfers all ownership and intellectual property rights of
                  the final deliverables to the Client.
                </li>
                <li>
                  6. Termination Either party may terminate this Agreement by
                  providing written notice. Upon termination: The Client will
                  pay the Freelancer for all completed work up to the date of
                  termination. The Freelancer will deliver all completed work
                  and return any client materials.
                </li>
                <li>
                  7. Acceptance of Work The Client agrees to review the work
                  within 3 days of receipt and provide feedback or approval. If
                  the Client does not respond within this period, the work will
                  be deemed accepted.
                </li>
                <li>
                  8. Dispute Resolution Any disputes arising out of this
                  Agreement will be resolved through mediation. If mediation
                  fails, the parties may pursue legal action in the courts of
                  the Philippines.
                </li>
                <li>
                  9. Agreement Acknowledgment By signing below, both parties
                  acknowledge that they have read, understood, and agree to the
                  terms and conditions of this Agreement.
                </li>
              </ol>
              <p className="mt-6">
                This Contract is made on this{" "}
                <b>{formatDate(new Date().toISOString())}</b>, between:
                <br />
                <br />
                Client :{" "}
                <b>
                  {requestInfos.clientId.firstName +
                    " " +
                    requestInfos.clientId.surName}
                </b>
                <br />
                Email: {requestInfos.clientId.eMail}
                <br />
                <br />
                Freelancer:{" "}
                <b>
                  {requestInfos.serviceId.freelancerId.firstName +
                    " " +
                    requestInfos.serviceId.freelancerId.surName}
                </b>
                <br />
                Email: {requestInfos.serviceId.freelancerId.eMail}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white py-4">
          <form className="flex px-10">
            <input
              type="checkbox"
              checked={isChecked || requestInfos.contractC} // Set checked if isChecked is true or if contractC is true
              disabled={requestInfos.contractC} // Disable if contractC is true
              onChange={() => setIsChecked(!isChecked)} // Toggle isChecked when checkbox is changed
            />
            <p className="whitespace-wrap ml-4 text-sm italic">
              I certify and acknowledge that I have read and accepted the
              contract above
            </p>
          </form>
        </div>
        <div className="flex flex-row items-center justify-between bg-white border-t border-solid border-blueGray-200 rounded-b">
          <div className="bg-white p-6 ">
            <button
              className="flex gap-2 justify-center items-center text-white rounded-md bg-blue-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handlePrint}
            >
              <FaPrint className="" />
              Print
            </button>
          </div>
          <div className="bg-white flex items-center justify-end p-6">
            {requestInfos?.contractC === false ? (
              <>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setContractModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleProceed}
                >
                  Proceed
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setContractModal(false)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;
