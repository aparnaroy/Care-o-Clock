import {
  Box,
  Flex,
  Grid,
  Image,
} from "@chakra-ui/react";
// import { Provider } from "@/components/ui/provider";
import { Tabs } from "@chakra-ui/react";
import Chatbot from "./Chatbot";
import Calendar from "./Calendar";

const NavBar = () => {
    return (
        
            <Box textAlign="center" fontSize="xl" backgroundColor="#d9fff7">
            <Tabs.Root defaultValue="chatbot" orientation="vertical">
                <Flex
                as="nav"
                align="center"
                justify="space-between"
                padding="1rem 1rem"
                bgGradient="linear(to-b, #167875, #d9fff7)"
                color="white"
                >
                <Flex align="center" ml={5} mr={10}>
                    <Image src="hand-waving.png" alt="Logo" w="100px" h="auto" />
                </Flex>
                <Tabs.List paddingTop="4" paddingBottom="4" color="white" ml="auto">
                    <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                    <Tabs.Trigger
                        value="chatbot"
                        color="#ffffff"
                        fontSize="18px"
                        _hover={{ color: "#000000", backgroundColor: "#ffffff" }}
                    >
                        Chatbot
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="calendar"
                        color="#ffffff"
                        fontSize="18px"
                        _hover={{ color: "#000000", backgroundColor: "#ffffff" }}
                    >
                        Calendar
                    </Tabs.Trigger>
                    </Grid>
                </Tabs.List>
                </Flex>

                <Tabs.Content value="chatbot" padding="0px">
                <Chatbot />
                </Tabs.Content>
                <Tabs.Content value="calendar">
                <Calendar />
                </Tabs.Content>
            </Tabs.Root>
            <Box width="100%" py={8} textAlign="center" backgroundColor="#efddcc">
                Made with 🤟 by Aparna Roy, Sneha Nangelimalil, Benita Abraham, Aman Singh
            </Box>
            </Box>
    )
};

export default NavBar;