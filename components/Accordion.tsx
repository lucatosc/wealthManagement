import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { TableTemp, TableData } from "./Table";
import { FaPlus, FaMoneyBillWave, FaGem } from 'react-icons/fa';
import { getDateNow } from './mainPage';
import { GoHomeFill } from "react-icons/go";
import { MdOutlineTrendingDown } from "react-icons/md";
import { AiFillPieChart } from "react-icons/ai";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
    ))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export type titleData = {
    name: string, price: string
};

export type contentData = {
    title: titleData, table: TableData
};

export type AccordionData =
    {
        title: titleData,
        content: contentData [],
    };

type Props = {
    accordionData: AccordionData [];
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
    newDate: Date; 
    setNewDate: any;
    newAccount: string;
    setNewAccount: any;
    checkCateId: string;
    setCheckCateId: any;
};

export const AccordionTemp: React.FC<Props> = ({
    accordionData, 
    state, 
    setState, 
    openModal, 
    setOpenModal, 
    checked,
    setChecked, 
    account, 
    setAccount, 
    amount, 
    setAmount, 
    newAccount, 
    setNewAccount, 
    newDate, 
    setNewDate,
    checkCateId,
    setCheckCateId,
  }: Props) => {

    const addLiquidita = (e : any, index: number) => {
        e.preventDefault();
        setState("Add New Liquidita");
        setOpenModal(true);
        setChecked(index);
        setAccount("");
        setAmount(0);
        setNewDate(getDateNow());
    }
    
    return (
        accordionData.map((acco, index) => 
            <Accordion key={index} className="mb-3 rounded-lg">
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" onClick={() => setChecked(index)}>
                    {/* <Typography> */}
                        <div className="flex items-center justify-between pl-3" style={{width: 'calc(100vw - 170px)'}}>
                            <div className='flex items-center'>
                                {index === 0 && <div className='w-9 h-9 rounded-full bg-[#defceb] flex items-center justify-center'>
                                    <FaMoneyBillWave color='rgb(39, 180, 93)' />
                                </div>}
                                {index === 1 && <div className='w-9 h-9 rounded-full bg-[#d2dcf6] flex items-center justify-center'>
                                    <AiFillPieChart color='rgb(25, 29, 141)' />
                                </div>}
                                {index === 2 && <div className='w-9 h-9 rounded-full bg-[#f7e9cd] flex items-center justify-center'>
                                    <GoHomeFill color='rgb(185, 133, 7)' />
                                </div>}
                                {index === 3 && <div className='w-9 h-9 rounded-full bg-[#e4c4fa] flex items-center justify-center'>
                                    <FaGem color='rgb(71, 0, 175)' />
                                </div>}
                                {index === 4 && <div className='w-9 h-9 rounded-full bg-[#facbc4] flex items-center justify-center'>
                                    <MdOutlineTrendingDown color='rgb(191, 18, 36)' />
                                </div>}
                                <div className='pl-3 text-xl font-semibold'>{acco.title.name}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="pr-4 text-xl">€{acco.title.price}</div>
                                <div><FaPlus onClick={e => addLiquidita(e, index)}/></div>
                            </div>
                        </div>
                    {/* </Typography> */}
                </AccordionSummary>
                <AccordionDetails style={{padding: "16px 0 0 20px"}}>
                    {acco.content.length > 0 && acco.content.map((_acco, index) => 
                        <Accordion key={index} className="mb-4 rounded-lg rounded-r-none">
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                {/* <Typography> */}
                                    <div className="flex items-center justify-between" style={{width: 'calc(100vw - 190px)'}}>
                                        <div>{_acco.title.name}</div>
                                        <div className="flex items-center">
                                            <div className="pr-4">€{_acco.title.price}</div>
                                        </div>
                                    </div>
                                {/* </Typography> */}
                            </AccordionSummary>
                            {_acco.table && <AccordionDetails style={{padding: "0"}}>
                                {/* <Typography> */}
                                    <TableTemp 
                                        tableData={_acco.table} 
                                        state={state} 
                                        setState={setState} 
                                        openModal={openModal} 
                                        setOpenModal={setOpenModal} 
                                        checked={checked} 
                                        setChecked={setChecked} 
                                        account={account} 
                                        setAccount={setAccount}
                                        amount={amount} 
                                        setAmount={setAmount} 
                                        newDate={newDate} 
                                        setNewDate={setNewDate}
                                        checkCateId={checkCateId}
                                        setCheckCateId={setCheckCateId}
                                    />
                                {/* </Typography> */}
                            </AccordionDetails>}
                        </Accordion>
                    )}
                </AccordionDetails>
            </Accordion>
        )
    );
}
