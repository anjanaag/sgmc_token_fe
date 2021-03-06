import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    HStack,
    Heading,
    Checkbox,
    Editable,
    EditablePreview,
    EditableInput,
    Text,
    VStack,
    InputGroup
} from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react'
import api from '../../api';
import { ButtonPopoverReception } from '../../Reception/Home/PopoverReception';
import { DiffMinutes, filterList, findBg } from '../../utils/tokenFunctions';
import { useMediaQuery } from '@chakra-ui/react'
import { DetailsPopover } from './DetailsPopover';
import { ButtonPopover } from './Popover';
import userApi from '../../api/user';
import { AppContext } from '../../App';

// List of staff profiles pending approval

export const WalkInList = ({ isLoading, setIsLoading, walklist, current, setCurrent }) => {

    const [isLaptop, isMobile] = useMediaQuery(['(min-width: 1224px)', '(max-width: 1224px)'])
    const [showCompleted, setShowCompleted] = useState(false)
    //  const [aftlist, setAftList] = useState([])
    const types = {
        "Review": "R",
        "First time": 'F',
        "Other": "O"
    }
    const { user } = useContext(AppContext)


    function handleChange() {
        setShowCompleted(!showCompleted)
    }

    function handleDoubleClick(id) {
        let fileNo = window.prompt("Enter the file number")
        if (fileNo != null)
            editFileNumber(fileNo, id)
    }


    function editFileNumber(value, id) {
        api.token.editFileNumber({ value, id }).then((res) => {
            const response = JSON.parse(res.data).result
            window.location.reload()
        })
    }


    return (
        <>

            <HStack spacing={"auto"}>
                <Checkbox onChange={handleChange} colorScheme={"blue"} borderColor={"black"} size={"md"}>Show all</Checkbox>
            </HStack>
            <Box
                rounded={'lg'}
                bg={'white'}
                boxShadow={'lg'}
                p={0}
                width='auto'>
                <TableContainer>
                    <Table variant='striped' size={isMobile ? "sm" : "md"} colorScheme='grey'>
                        <Thead>
                            <Tr>
                                <Th></Th>
                                <Th>Token
                                </Th>
                                {isMobile && <Th>Type</Th>}
                                <Th>Name</Th>
                                {isMobile && <Th></Th>}
                                {isLaptop && <><Th>File No.</Th>
                                    <Th>Type</Th>
                                    <Th>Phone</Th>
                                    <Th>Token Time</Th>
                                    <Th>In</Th>
                                    <Th>Out</Th></>}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filterList(walklist, showCompleted).map((item, index) =>
                                <Tr key={index} bg={findBg(item)}>
                                    <Td><ButtonPopover loading={isLoading} setIsLoading={setIsLoading} current={current} setCurrent={setCurrent} item={item} /></Td>
                                    <Td >{`${item.slot}-${item.tokenNumber}`}</Td>
                                    {isMobile && <Td>{types[item.type]}</Td>}
                                    <Td >{item.name}</Td>
                                    {isMobile && item.timeInEst && <Td>
                                        <VStack>
                                            <DetailsPopover current={current} setCurrent={setCurrent} item={item} />
                                            <DiffMinutes time1={item.timeIn} time2={item.timeInEst} item={item} />
                                            {/* <Text >{item.timeIn ? diffMinutes(item.timeIn, item.timeInEst) : ""} </Text> */}
                                        </VStack>
                                    </Td>}
                                    {isLaptop && <><Td><Text placeholder='Add file' onDoubleClick={() => handleDoubleClick(item.patientID)}>{item.fileNumber ? item.fileNumber : "----"}</Text>
                                    </Td>
                                        <Td> {item.type}</Td>
                                        <Td>{item.phone.substring(2)}</Td>
                                        <Td>
                                            <VStack alignItems={"baseline"}>
                                                <Text>{item.timeInEst ? new Date('1970-01-01T' + item.timeInEst + 'Z')
                                                    .toLocaleTimeString('en-US',
                                                        { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }) : ""}
                                                </Text>
                                                <DiffMinutes time1={item.timeIn} time2={item.timeInEst} item={item} />
                                            </VStack>
                                        </Td>
                                        <Td>{item.timeIn ? new Date('1970-01-01T' + item.timeIn + 'Z')
                                            .toLocaleTimeString('en-US',
                                                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }) : ""}
                                        </Td>
                                        <Td>{item.timeOut ? new Date('1970-01-01T' + item.timeOut + 'Z')
                                            .toLocaleTimeString('en-US',
                                                { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }) : ""}
                                        </Td></>}

                                </Tr>
                            )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

        </>

    )
}
