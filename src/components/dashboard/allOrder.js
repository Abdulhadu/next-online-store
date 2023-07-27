import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  // Link,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";

import { NoSsr } from "@mui/material"; //It will Prevet the Hydration Error
import React, { useEffect, useState } from "react";
import { getOrdersData, updateOrderStatus } from "../../../services/admin";

export async function getStaticProps() {
  const data = (await getOrdersData()) || [];

  return {
    props: { data },
  };
}

const allOrder = ({ data }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Fetch the updated data from the server
      getOrdersData().then((newData) => {
        // Modify the data structure
        const modifiedData = newData.map((order) => {
          return {
            ...order,
            products: Object.values(order.products), // Convert products object to an array
          };
        });
        setFinalOrder(modifiedData);
      });
    }, 3000);

    
    return () => {
      clearInterval(intervalId);
    };
    
  }, []);
  
  const [finalOrder, setFinalOrder] = useState(data);
  
  const handleReadyToShipClick = (orderId) => {
    // Pass both orderId and status to the updateOrderStatus function
    updateOrderStatus(orderId, "Shipped").then((updatedData) => {
      // Update the finalOrder state with the updated data
      setFinalOrder(updatedData);
    });
  };

  return (
    <NoSsr>
    <BaseCard title="View Orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                User Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Order Details
              </Typography>
            </TableCell>
            <Box sx={{ width: "200px" }}>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Customer Address
                </Typography>
              </TableCell>
            </Box>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Total Amount
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Status
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {finalOrder?.map((order) => {
            return (
              <>
                <TableRow>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {order.userId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "600",
                          }}
                        >
                          {order.userName}
                        </Typography>
                        {order.products.map((product) => (
                          <Typography
                            key={product.productid}
                            color="textSecondary"
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {product.productid} - Quantity: {product.quantity}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ width: "200px" }}>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {order.address}
                    </Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography variant="h6">{order.price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        pl: "4px",
                        pr: "4px",
                        backgroundColor:
                          order.status === "pending" ? "#e53935" : "#4CAF50",
                        color: "#fff",
                      }}
                      size="small"
                      label={order.status}
                    ></Chip>
                  </TableCell>
                  <TableCell align="right">
                    <button
              
                        onClick={() => handleReadyToShipClick(order._id)}
                        className="bg-orange-500 mx-2 hover:bg-orange-900 text-black font-bold py-2 px-4 rounded-full cursor-pointer"
                    >
                        Ready To Ship
                     
                    </button>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </BaseCard>
    </NoSsr>
  );
};

export default allOrder;
