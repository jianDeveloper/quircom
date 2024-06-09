import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavHeader from "./CMainNav";
import CFooter from "./CFooter";
import mpTop from "../assets/mpTop.jpg";
import CCards from "./Marketcomponents/CCards";
import WithAuth from "../auth/WithAuth";
import { FaFilter } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const CMarketplace = () => {
  const { serviceId } = useParams();
  const [services, setServices] = useState([]);
  const [filterTab, setFilterTab] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSubcategories, setShowSubcategories] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.get(
          `https://quircom.onrender.com/api/service/`,
          { headers }
        );
        if (response.status === 200) {
          setServices(response.data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [serviceId]);

  const filteredServices = services.filter((service) => {
    const matchesType = selectedServiceType
      ? service.serviceType === selectedServiceType
      : true;
    const matchesSubCategory = selectedSubCategories.length
      ? selectedSubCategories.some(subCat => service.serviceSubCat.includes(subCat))
      : true;
    const matchesSearch = searchQuery
      ? service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesType && matchesSubCategory && matchesSearch;
  });

  const handleFilter = (type) => {
    setSelectedServiceType(type);
    setFilterTab(type ? "Filter" : "");
    setSelectedSubCategories([]);
    setShowSubcategories(true);
  };

  const handleSubCategoryChange = (event) => {
    const subCategory = event.target.value;
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleFilterTab = () => {
    setShowSubcategories(!showSubcategories);
  };

  const subcategories = {
    Animation: [
      "2D Animation",
      "3D Animation",
      "Motion Graphics",
      "Whiteboard Animation",
      "Stop Motion",
      "Character Animation",
      "Explainer Videos",
      "Logo Animation",
      "Product Animation",
      "Visual Effects",
    ],
    "Graphic Design": [
      "Logo Design",
      "Illustration",
      "UI/UX Design",
      "Banner Design",
      "Brochure Design",
      "Business Card Design",
      "Flyer Design",
      "Infographic Design",
      "Packaging Design",
      "Print Design",
    ],
    "Graphic Motion": [
      "Animated Logos",
      "Title Sequences",
      "Promotional Videos",
      "Social Media Videos",
      "Corporate Videos",
      "Event Videos",
      "Training Videos",
      "Demo Videos",
      "Music Videos",
    ],
    "Software Development": [
      "Web Apps",
      "Mobile Apps",
      "Desktop Apps",
      "Game Development",
      "API Development",
      "Database Design",
      "E-commerce Development",
      "Software Testing",
      "DevOps",
      "System Integration",
    ],
    "Web Development": [
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "WordPress Development",
      "Shopify Development",
      "Web Optimization",
      "Web Maintenance",
      "Web Security",
    ],
  };

  const handleRemoveFilter = () => {
    setSelectedSubCategories([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavHeader />
      <div className="flex items-center">
        <div className="flex-col mx-10 my-10 w-full">
          <div
            className="w-full h-[300px] relative rounded-lg"
            style={{
              background: `url(${mpTop}) no-repeat center center`,
              backgroundSize: "cover",
            }}
          >
            <div className="absolute bottom-10 left-10 text-white p-2">
              <h1 className="text-[50px] font-bold mb-5">Freelancing Services</h1>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col w-full mt-10 px-[20rem]">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative w-full flex border border-[#1d5b79] items-center justify-between rounded-md">
                  <svg
                    className="absolute left-2 block h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" className=""></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                  </svg>
                  <input
                    type="text"
                    name="search"
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    placeholder="Search by services..."
                  />
                </div>
              </form>
              <div className="flex mt-6 space-x-3 justify-center">
                {selectedServiceType && (
                  <button
                    onClick={handleFilterTab}
                    className="flex items-center justify-center px-2 py-1 border-2 border-[#1D5B79] text-[#1D5B79] rounded-md"
                  >
                    <FaFilter />
                    <IoFilter />
                  </button>
                )}
                <button
                  onClick={() => {
                    handleFilter(null);
                    setShowSubcategories(false);
                  }}
                  className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                >
                  All
                </button>
                {Object.keys(subcategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => {handleFilter(category);
                      setShowSubcategories(false);
                    }}
                    className="px-4 py-1 bg-[#1D5B79] hover:bg-[#2069A3] text-white rounded-md"
                  >
                    {category}
                  </button>
                ))}
              </div>
              {showSubcategories && selectedServiceType && (
                <>
                <div className="bg-white px-4 py-2 mt-2 grid grid-cols-4 gap-2 rounded-lg border-[1px] shadow-sm">
                  {subcategories[selectedServiceType]?.map((subcat) => (
                    <label key={subcat} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="serviceSubCat"
                        value={subcat}
                        checked={selectedSubCategories.includes(subcat)}
                        onChange={handleSubCategoryChange}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{subcat}</span>
                    </label>
                  ))}
                  <div className="col-span-4 flex justify-end px-4">
                  <button className="bg-blue-100 px-2 rounded-md border-[1px] border-[#1D5B79] hover:bg-blue-200" onClick={handleRemoveFilter}>Remove Filter</button>
                  </div>
                  
                </div>
                </>)}
            </div>
          </div>
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <Card className="mt-6 min-w-sm max-w-96 max-h-[30rem] pt-6">
                      <CardHeader className="relative h-[400px] bg-gray-200 rounded-md"></CardHeader>
                      <CardBody className="flex flex-col justify-between items-start h-full">
                        <div className="flex flex-col">
                          <Typography className="mb-2 text-gray-400">
                            <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
                          </Typography>
                          <Typography className="mb-2 text-gray-400 font-bold text-3xl">
                            <div className="h-8 w-44 bg-gray-200 rounded-full"></div>
                          </Typography>
                          <Typography className="text-gray-400">
                            <div className="h-5 w-32 bg-gray-200 rounded-full"></div>
                          </Typography>
                        </div>
                        <div className="align-bottom mt-10 w-full flex justify-center bg-gray-200 rounded-md hover:bg-gray-300 active:bg-gray-400">
                          <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
                        </div>
                      </CardBody>
                      <CardFooter></CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {filteredServices.length === 0 ? (
                  <p className="text-center my-28 text-[32px] font-extrabold text-gray-800">
                    No Available Service at the moment ...
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredServices.map((item, index) => (
                      <CCards
                        key={index}
                        serviceId={item?._id}
                        image={item?.thumbNail?.link}
                        subtitle={item.serviceType}
                        title={item.serviceName}
                        author={
                          (item?.freelancerId?.firstName || "") +
                          " " +
                          (item?.freelancerId?.surName || "")
                        }
                        subCat={item.serviceSubCat}
                        button="Avail"
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <CFooter />
      </div>
    </div>
  );
};

export default WithAuth(CMarketplace);
