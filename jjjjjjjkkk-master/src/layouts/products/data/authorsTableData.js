import { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import axios from "axios";

export default function useClubData() {
  const [clubData, setClubData] = useState([]);

  useEffect(() => {
    async function fetchClubData() {
      try {
        const response = await axios.get(
          "https://nutrigym.onrender.com/api/v1/club"
        );

        setClubData(response.data.data);
      } catch (error) {
        console.error("Error fetching club data:", error);
      }
    }

    fetchClubData();
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
    { Header: "Club", accessor: "club", width: "30%", align: "left" },
    { Header: "Governorate", accessor: "governorate", align: "left" },
    { Header: "Street", accessor: "street", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },
  ];

  const rows = clubData.map((club) => ({
    club: <Author name={club.name} />,
    governorate: <Governorate title={club.location.governorate} />,
    street: club.location.street,
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
