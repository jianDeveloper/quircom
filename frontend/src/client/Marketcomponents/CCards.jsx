import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import WithAuth from "../../auth/WithAuth";


const CCards = ({ image, serviceId, subtitle, title, author, button, subCat }) => {
  const [userData, setUsers] = useState();
  const { userId } = useParams();
  const [userServices, setServices] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/client/${userId}`,
          { headers }
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [userId]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/service/${serviceId}`,
          { headers }
        );
        if (response.status === 200) {
          setServices(response.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [serviceId]);

  return (
    <Card className="mt-6 min-w-sm max-w-96 max-h-[30rem] pt-6">
      <CardHeader className="relative h-[400px]">
        <img
          className="rounded-md w-full h-full object-cover"
          src={image}
          alt={title}
        />
      </CardHeader>
      <CardBody className="flex flex-col justify-between items-start h-full">
        <div className="flex flex-col">
          <Typography className="mb-2 text-orange-600">{subtitle}</Typography>
          <Typography className="mb-2 text-[#1D5B79] font-bold text-3xl">
            {title}
          </Typography>
          <Typography className="text-[#1D5B79]">{author}</Typography>
        </div>
        <div className="flex flex-wrap">
          {subCat.map((subcategory) => (
            <button
              key={subcategory}
              className="text-[10px] p-2 m-1 rounded-lg font-bold text-[#1D5B79] border-solid border-2 border-[#1D5B79] bg-[#EBF5FF] hover:bg-[#1D5B79] hover:text-white"
            >
              {subcategory}
            </button>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <div className="align-bottom w-full flex justify-center">
          <Link
            to={`/client/service-connect/${userId}/${serviceId}`}
            className="w-full"
          >
            <Button className="w-full h-10 p-2 text-center bg-orange-600 rounded-md hover:bg-[#1D5B79] active:bg-blue-800">
              {button}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WithAuth(CCards);
