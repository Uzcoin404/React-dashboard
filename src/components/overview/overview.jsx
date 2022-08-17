import React from "react";
import Chart from "react-apexcharts";

import {
    Box,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Typography,
    Divider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Chip,
} from "@mui/material";

import avatarImage from "../../assets/img/avatar.png";

function Overview() {
    let categories = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const data = {
        type: "bar",
        options: {
            chart: {
                id: "bar-chart",
                stacked: true,
                toolbar: {
                    show: true,
                },
                zoom: {
                    enabled: true,
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: "bottom",
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "50%",
                },
            },
            xaxis: {
                type: "category",
                categories,
            },
            legend: {
                show: true,
                fontSize: "14px",
                fontFamily: `'Roboto', sans-serif`,
                position: "bottom",
                offsetX: 20,
                labels: {
                    useSeriesColors: false,
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5,
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8,
                },
            },
            fill: {
                type: "#fff",
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                show: true,
            },
        },
        series: [
            {
                name: "Investment",
                data: categories.map(() => Math.floor(Math.random() * 100)),
            },
            {
                name: "Loss",
                data: categories.map(() => Math.floor(Math.random() * 100)),
            },
            {
                name: "Profit",
                data: categories.map(() => Math.floor(Math.random() * 100)),
            },
            {
                name: "Maintenance",
                data: categories.map(() => Math.floor(Math.random() * 100)),
            },
        ],
    };
    const item = {
        borderRadius: "16px",
        backgroundColor: "#fff",
        p: { lg: 3, xs: 2 },
        width: "100%",
        height: "100%",
        boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
    };

    function elementGenerator(element, amount) {
        return Array.apply(null, new Array(amount)).map((val, i) =>
            React.cloneElement(element, {
                key: i,
            })
        );
    }

    function createData(transaction, date, amount, status) {
        amount = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
        return { transaction, date, amount, status };
    }

    const rows = [
        createData(
            "Payment from Bonnie Green",
            "Apr 23 ,2021",
            2300,
            "Completed"
        ),
        createData(
            "Payment from Bonnie Green",
            "Apr 23 ,2021",
            2300,
            "Completed"
        ),
        createData(
            "Payment from Bonnie Green",
            "Apr 23 ,2021",
            2300,
            "Completed"
        ),
        createData(
            "Payment from Bonnie Green",
            "Apr 23 ,2021",
            2300,
            "Completed"
        ),
        createData(
            "Payment from Bonnie Green",
            "Apr 23 ,2021",
            2300,
            "Completed"
        ),
    ];

    return (
        <Box className="overview" sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={item}>
                        <Chart {...data} />
                    </Paper>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <Paper sx={item}>
                        <Typography
                            sx={{ mb: 2 }}
                            variant="h6"
                            color="#111827"
                            fontWeight="600"
                        >
                            Latest Customers
                        </Typography>
                        <List>
                            {elementGenerator(
                                <>
                                    <ListItem
                                        sx={{
                                            py: 0.5,
                                            px: 0,
                                            color: "#111827",
                                        }}
                                    >
                                        <Avatar
                                            alt=""
                                            src={avatarImage}
                                            sx={{
                                                width: "32px",
                                                height: "32px",
                                                mr: 1,
                                            }}
                                        />
                                        <ListItemText
                                            primary="Neil Sims"
                                            secondary="email@example.com"
                                            sx={{
                                                "& span": {
                                                    fontWeight: "600",
                                                    lineHeight: "24px",
                                                },
                                                "& p": {
                                                    fontSize: "12px",
                                                    fontWeight: "400",
                                                    lineHeight: "18px",
                                                    color: "#6B7280",
                                                },
                                            }}
                                        />
                                        <Typography
                                            variant="p"
                                            color="#111827"
                                            fontWeight="600"
                                        >
                                            $367
                                        </Typography>
                                    </ListItem>
                                    <Divider />
                                </>,
                                6
                            )}
                        </List>
                    </Paper>
                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                    <Paper sx={item}>
                        <Typography
                            sx={{ mb: 2 }}
                            variant="h6"
                            color="#111827"
                            fontWeight="600"
                        >
                            Top products
                        </Typography>
                        <List>
                            {elementGenerator(
                                <>
                                    <ListItem
                                        sx={{
                                            py: 0.5,
                                            px: 0,
                                            color: "#111827",
                                        }}
                                    >
                                        <ListItemText
                                            primary="Restaurant Booking App"
                                            secondary="React & Material UI Framework"
                                            sx={{
                                                "& span": {
                                                    fontWeight: "600",
                                                    lineHeight: "24px",
                                                },
                                                "& p": {
                                                    fontSize: "12px",
                                                    fontWeight: "400",
                                                    lineHeight: "18px",
                                                    color: "#6B7280",
                                                },
                                            }}
                                        />
                                        <Typography
                                            variant="p"
                                            color="#111827"
                                            fontWeight="600"
                                        >
                                            70 sales
                                        </Typography>
                                    </ListItem>
                                    <Divider />
                                </>,
                                6
                            )}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={item}>
                        <Typography
                            sx={{ mb: -1 }}
                            variant="h6"
                            color="#111827"
                            fontWeight="600"
                        >
                            Transactions
                        </Typography>
                        <Typography variant="p" color="#71717A" fontSize={12}>
                            This is a list of latest transactions.
                        </Typography>
                        <TableContainer
                            sx={{
                                // width: '100vw',
                            }}
                        >
                            <Table
                                sx={{
                                    mt: 2,
                                    tableLayout: 'fixed',
                                    // width: {lg: '100%', md: '100%', sm: '100%', xs: '140%'},
                                    // overflowX: "auto",
                                }}
                            >
                                <TableHead>
                                    <TableRow
                                        sx={{ backgroundColor: "#F9FAFB" }}
                                    >
                                        <TableCell
                                            sx={{ borderTopLeftRadius: 12 }}
                                        >
                                            TRANSACTION
                                        </TableCell>
                                        <TableCell align="center">
                                            DATE & TIME
                                        </TableCell>
                                        <TableCell align="center">
                                            AMOUNT
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            sx={{ borderTopRightRadius: 12 }}
                                        >
                                            STATUS
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody
                                    sx={{
                                        "& tr:nth-child(2n + 2)": {
                                            backgroundColor: "#F9FAFB",
                                        },
                                    }}
                                >
                                    {rows.map((row, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell
                                                sx={{ borderBottom: "none" }}
                                                scope="row"
                                            >
                                                {row.transaction}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    borderBottom: "none",
                                                    color: "#6B7280",
                                                }}
                                            >
                                                {row.date}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    borderBottom: "none",
                                                    fontSize: 16,
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {row.amount}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{ borderBottom: "none" }}
                                            >
                                                <Chip
                                                    label={row.status}
                                                    color="success"
                                                    size="small"
                                                    sx={{
                                                        fontSize: 12,
                                                        lineHeight: "inherit",
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
export default Overview;
