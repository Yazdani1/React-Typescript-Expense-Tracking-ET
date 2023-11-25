import {
	useState,
	createContext,
	useEffect,
	FC,
	ReactNode,
	useContext,
} from 'react';
import { toast } from 'react-toastify';

import { getJobApplicationList } from '../services/API';
import { JobApplication } from '../services/DataProvider';

interface JobApplicationContextProps {
	allJobApplication: JobApplication[];
	loadJobApplication: () => void;
	loading: boolean;
}

export const JobApplicationContext = createContext<JobApplicationContextProps>({
	allJobApplication: [],
	loadJobApplication: () => {},
	loading: true,
});

export const useJobApplicationContext = () => useContext(JobApplicationContext);

interface JobApplicationProviderProps {
	children: ReactNode;
}

export const JobApplicationProvider: FC<JobApplicationProviderProps> = ({
	children,
}) => {
	const [loading, setloading] = useState<boolean>(true);
	const [allJobApplication, setAllJobApplication] = useState<JobApplication[]>(
		[]
	);

	const loadJobApplication = async () => {
		setloading(true);
		try {
			const res = await getJobApplicationList();
			if (res) {
				setAllJobApplication(res);
				setloading(false);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
			setloading(false);
		}
	};
	useEffect(() => {
		loadJobApplication();
	}, []);

	return (
		<JobApplicationContext.Provider
			value={{
				allJobApplication,
				loadJobApplication,
				loading,
			}}
		>
			{children}
		</JobApplicationContext.Provider>
	);
};
