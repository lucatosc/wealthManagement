import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getDateNow } from "./mainPage";
import { SlArrowRight } from "react-icons/sl";

export type TableData =
    {
        mainCategory: number,
        childCategory: string,
        title: string [],
        content: string [][]
    };

type Props = {
    tableData: TableData;
    state: string;
    setState: any;
    openModal: boolean;
    setOpenModal: any;
    checked: number;
    setChecked: any;
    account: string; 
    setAccount: any;
    amount: number;
    setAmount: any; 
    newDate: any; 
    setNewDate: any;
    checkCateId?: string;
    setCheckCateId?: any;
};

export const TableTemp: React.FC<Props> = ({
    tableData, state, setState, checked, setOpenModal, setChecked, setAccount, setNewDate, setAmount, checkCateId, setCheckCateId, 
  }: Props) => {

    const editData = (mainCate: number, _account: string, _newDate: string, _amount: string, id: string) => {
        setState("Add Update Liquidita");
        setOpenModal(true);
        setCheckCateId(id);
        setChecked(mainCate);
        setAccount(_account);
        setAmount(parseFloat(_amount));
        setNewDate(_newDate);
    }

    const deleteData = (mainCate: number, id: string) => {
        setState("Confirm");
        setOpenModal(true);
        setCheckCateId(id);
        setChecked(mainCate);
    }

    const setModal = (index: number) => {
        if(state === "Add New Asset") {
            setState("Add New Liquidita");
            setOpenModal(true);
            setChecked(index);
            setAccount("");
            setAmount(0);
            setNewDate(getDateNow());
        }
    }

    return (
        <Table striped>
            {state === "" && <TableHead>
                {tableData?.title.length > 0 ? 
                    tableData.title.map((item, index) => <TableHeadCell key={index}>{item}</TableHeadCell>)
                    : <TableHeadCell>No Data</TableHeadCell>
                }
                <TableHeadCell />
            </TableHead>}
            <TableBody className="divide-y">
                {tableData && tableData.content.length > 0 ? 
                    tableData.content.map((item, index) => (
                        <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800" onClick={e => setModal(index)}>
                            {item.map((val, cellIndex) =>
                                cellIndex < 2 && <TableCell key={cellIndex} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {val}
                                </TableCell>
                            )}
                            {state === "" && <TableCell className="flex justify-end">
                                <FaEdit className="mr-4 hover:cursor-pointer" onClick={() => editData(tableData.mainCategory, tableData.childCategory, item[0], item[1], item[2])}/>
                                <FaTrash className="hover:cursor-pointer" onClick={() => deleteData(tableData.mainCategory, item[2])}/>
                            </TableCell>}
                            {state === "Add New Asset" && <TableCell className="flex justify-end" >
                                <SlArrowRight className="cursor-pointer" />
                            </TableCell>}
                        </TableRow>
                    ))
                    : (
                        <TableRow>
                            <TableCell colSpan={tableData ? tableData.title.length + 1 : 1} className="text-center">
                                No Data
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableBody>
        </Table>
    );
}
