// import { TableData } from "@/components/Table";
// import { AccordionData } from "@/components/Accordion";

// const tableDataA1 : TableData = {title: ["Date", "Total"], content: [["AAAA", "AAAA"], ["BBBB", "BBBB"], ["CCCC", "CCCC"]]};
// const tableDataA2 : TableData = {title: ["Date", "Total"], content: []};
// const tableDataB : TableData = {title: ["Date", "Total"], content: [["DDDD", "DDDD"], ["EEEE", "EEEE"], ["FFFF", "FFFF"]]};

// export const accordionData : AccordionData [] = [
//     {
//         title: {name: "AAAAAAAA", price: "17382"},
//         content: [
//             {
//                 title: {name: "AAAAA(1)", price: "23532"},
//                 table: tableDataA1
//             },
//             {
//                 title: {name: "AAAAA(2)", price: "6734"},
//                 table: tableDataA2
//             }
//         ]
//     },
//     {
//         title: {name: "BBBBB", price: "65563"},
//         content: [
//             {
//                 title: {name: "BBBBB(1)", price: "43633"},
//                 table: tableDataB
//             },
//             {
//                 title: {name: "BBBBB(2)", price: "78564"},
//                 table: tableDataB
//             },
//             {
//                 title: {name: "BBBBB(3)", price: "35263"},
//                 table: tableDataB
//             }
//         ]
//     }
// ];

// export const listData : TableData = {
//     title: [""],
//     content: [["Liquidita"], ["Investimenti"], ["Immobiliare"], ["Altenativi"], ["Passivita"]]
// };

export const options = {
    chart: {
        type: 'line',
        height: 350
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    series: [{
        name: 'Sales',
        data: [30, 40, 35, 50, 49, 60]
    }]
};

export const userlist = [
    "bank1", "bank2", "bank3"
];