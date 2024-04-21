import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios"; // Import axios for making HTTP requests
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CCards = ({ image, serviceId, subtitle, title, author, button }) => {
  const [userData, setUsers] = useState();
  const { userId } = useParams();
  const [userServices, setServices] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `https://quircom.onrender.com/api/client/${userId}`
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
        const response = await axios.get(`https://quircom.onrender.com/api/service/${serviceId}`);
        if (response.status === 200) {
          setServices(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
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
        <div className="align-bottom  mt-10 w-full flex justify-center bg-orange-600 rounded-md hover:bg-[#1D5B79] active:bg-blue-800">
          {" "}
          {/* Added flexbox properties */}
          <Link to={`/client/service-connect/${userId}/${serviceId}`}>
            <Button className=" h-10 text-center p-2 ">{button}</Button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default CCards;
