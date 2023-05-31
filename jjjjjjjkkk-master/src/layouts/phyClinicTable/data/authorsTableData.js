import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";

export default function usephyClinicData() {
  const [phyClinicData, setPhyClinicData] = useState([]);

  useEffect(() => {
    async function fetchphyClinicData() {
      try {
        const response = await axios.get(
          "https://nutrigym.onrender.com/api/v1/phyclinic"
        );

        setPhyClinicData(response.data.data);
      } catch (error) {
        console.error("Error fetching phyClinic data:", error);
      }
    }

    fetchphyClinicData();
  }, []);

  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={0} lineHeight={0}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Governorate = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
    </MDBox>
  );

  const columns = [
    { Header: "PhyClinic", accessor: "phyClinic", width: "30%", align: "left" },
    { Header: "Governorate", accessor: "governorate", align: "left" },
    { Header: "Street", accessor: "street", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
  ];

  const rows = phyClinicData.map((phyClinic) => ({
    phyClinic: <Author name={phyClinic.name} />,
    governorate: <Governorate title={phyClinic.location.governorate} />,
    street: phyClinic.location.street,
    action: (
      <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        Edit
      </MDTypography>
    ),
  }));

  return {
    columns,
    rows,
  };
}
