import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack, Image, Text, HStack, Center, VStack, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import api from "../api";


export const CurrentPatient = ({ current, setCurrent }) => {
    const [curr, setCurr] = useState("")

    useEffect(() => {

    }, [current]);

    function next() {

        api.token.callNextToken({ item: current }).then((res) => {
            window.location.reload()
        })
    }

    return (
        <VStack>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                width={"100%"}
               // w={{ sm: '100%', md: '35rem' }}
                height={{ sm: '476px', md: '9rem' }}
                direction={{ base: 'column', md: 'row' }}
                bg={'white'}
                mx="auto"
                boxShadow={'2xl'}
                padding={4}>{current ?
                    <HStack spacing={"auto"} width="full" height={"full"}>
                        <Box width="25%" height={"90%"}
                            rounded="lg"
                            boxShadow={"lg"}
                            textAlign="center"
                            paddingTop={"5%"}
                        >
                            <Heading color={"green"}>{`${current?.slot}-${current?.tokenNumber}`}</Heading>
                        </Box>
                        <VStack>
                            <Text fontWeight={"bold"} fontSize={"large"}>{current?.name}</Text>
                            <Text fontWeight={"bold"} fontSize={"large"}>{current?.type}</Text>
                        </VStack>
                        <VStack width="30%">
                            <Text fontWeight={"bold"} >Time in:</Text>
                            <Box width="full" height={"90%"}
                                rounded="lg"
                                boxShadow={"lg"}
                                textAlign="center"
                                padding={"2%"}
                            > <Text color={"green"} fontSize={"x-large"}>{current.timeIn ? new Date('1970-01-01T' + current.timeIn + 'Z')
                                .toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }) : ""}
                                </Text>
                            </Box>
                        </VStack>
                    </HStack> :
                    <VStack>
                        <Heading color="green" width="full" textAlign={"center"} size="lg">
                            Please call the next token</Heading>
                        <Text>Click on  <HamburgerIcon boxSize={"5"} border={"1px"} />  next to the token and press <Button size="sm" colorScheme={"blue"}>Call</Button></Text>
                    </VStack>}
            </Box>
        </VStack>
    )
}