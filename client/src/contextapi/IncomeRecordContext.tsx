// import {
//   useState,
//   createContext,
//   useEffect,
//   FC,
//   ReactNode,
//   useContext,
// } from "react";
// import { toast } from "react-toastify";

// import { getLogedInUserIncomeRecord } from "../services/API";
// import { IncomeRecord } from "../services/DataProvider";

// export const IncomeRecordContext = createContext<null | any>(null);

// // To use this context api - now from any other component i just need to call useHomeRentalContext function
// // and then i can use all these api data in any other components..

// export const useIncomeRecordContext = () => useContext(IncomeRecordContext);

// interface IncomeRecordProviderProps {
//   children: ReactNode;
// }

// export const IncomeRecordProvider: FC<IncomeRecordProviderProps> = ({
//   children,
// }) => {

//   /****************************************/
//   /*** Loged In User Income Record ********/
//   /****************************************/

//   const [allIncomeRecords, setAllIncomeRecords] = useState<IncomeRecord[]>([]);

//   const loadLogedInUserIncomeRecords = async () => {
//     try {
//       const res = await getLogedInUserIncomeRecord();
//       setAllIncomeRecords(res);
//     } catch (error: any) {
//       toast.error(error.response && error.response.data.error, {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };
//   // This function update the array of state when user create a new income reocrd. as soon as user create
//   // we need to add the response to this function and then it update arry that holds all the info

//   const addNewIncomeRecords = (newIncomeRecord: IncomeRecord) => {
//     setAllIncomeRecords([newIncomeRecord,...allIncomeRecords]);
//   };

//   useEffect(() => {
//     loadLogedInUserIncomeRecords();
//   }, []);

//   return (
//     <IncomeRecordContext.Provider value={{ allIncomeRecords,addNewIncomeRecords,loadLogedInUserIncomeRecords }}>
//       {children}
//     </IncomeRecordContext.Provider>
//   );
// };
// // In this context api - i am sending multiple api data in just one context api.
// // Now I can use this context api and can show my desire data in any component.

import {
  useState,
  createContext,
  useEffect,
  FC,
  ReactNode,
  useContext,
} from "react";
import { toast } from "react-toastify";

import { getLogedInUserIncomeRecord } from "../services/API";
import { IncomeRecord } from "../services/DataProvider";

interface IncomeRecordContextProps {
  allIncomeRecords: IncomeRecord[];
  // addNewIncomeRecords: (newIncomeRecord: IncomeRecord) => void;
  loadLogedInUserIncomeRecords: () => void;
}

export const IncomeRecordContext = createContext<IncomeRecordContextProps>({
  allIncomeRecords: [],
  // addNewIncomeRecords: () => {},
  loadLogedInUserIncomeRecords: () => {},
});

export const useIncomeRecordContext = () => useContext(IncomeRecordContext);

interface IncomeRecordProviderProps {
  children: ReactNode;
}

export const IncomeRecordProvider: FC<IncomeRecordProviderProps> = ({
  children,
}) => {
  const [allIncomeRecords, setAllIncomeRecords] = useState<IncomeRecord[]>([]);

  const loadLogedInUserIncomeRecords = async () => {
    try {
      const res = await getLogedInUserIncomeRecord();
      setAllIncomeRecords(res);
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadLogedInUserIncomeRecords();
  }, []);

  // const addNewIncomeRecords = (newIncomeRecord: IncomeRecord) => {
  //   setAllIncomeRecords((prevRecords) => [newIncomeRecord, ...prevRecords]);
  // };

  // This function just take the response after creating a new income record and then update the state.
  // This is a ways to update and show the new created post in the context api array.

  // const addNewIncomeRecords = (newIncomeRecord: IncomeRecord) => {
  //   setAllIncomeRecords([newIncomeRecord, ...allIncomeRecords]);
  // };



  return (
    <IncomeRecordContext.Provider
      value={{
        allIncomeRecords,
        // addNewIncomeRecords,
        loadLogedInUserIncomeRecords,
      }}
    >
      {children}
    </IncomeRecordContext.Provider>
  );
};
