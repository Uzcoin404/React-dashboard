import React from "react";
import Chart from "react-apexcharts";

import { Box, Grid } from "@mui/material";

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

    return (
        <Box className="overview">
            <Box
                sx={{
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    p: 4,
                    mb: 2,
                    boxShadow:
                        "0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Chart {...data} />
            </Box>
            <Grid columns={{ xs: 12, md: 12 }} spacing={2}>
                
            </Grid>
        </Box>
    );
}
export default Overview;
