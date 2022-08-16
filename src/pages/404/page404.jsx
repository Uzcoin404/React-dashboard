import { Box, Typography, Button, Toolbar } from "@mui/material";
import Nav from "../../components/nav/nav";

import pages from "../../layout/pages";
import icon404 from "../../assets/img/404.png";

function Page404() {
    return (
        <Box className="404" sx={{ height: "100vh" }}>
            <Nav pages={pages} isHaveSearch={false}/>
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <Toolbar />
                <img src={icon404} alt="" />
                <Typography variant="h3" fontWeight={700} sx={{mt: 10}}>
                    Page not found
                </Typography>
                <Typography
                    variant="p"
                    lineHeight={"24px"}
                    color="#6B7280"
                    sx={{ pb: "20px", pt: "10px" }}
                >
                    Oops! Looks like you followed a bad link. If you think this
                    is a problem with us, please tell us.
                </Typography>
                <Button
                    href="/"
                    sx={{
                        backgroundColor: "#0E9F6E",
                        color: "#fff",
                        px: 2,
                        py: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 3,
                        "&:hover": {
                            backgroundColor: "#02c583",
                        }
                    }}
                    variant="contained"
                >
                    Go back home
                </Button>
            </Box>
        </Box>
    );
}
export default Page404;
