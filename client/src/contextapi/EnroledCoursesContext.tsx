import {
	useState,
	createContext,
	useEffect,
	FC,
	ReactNode,
	useContext,
} from 'react';
import { toast } from 'react-toastify';

import { getEnroledCourseLists } from '../services/API';
import { CourseEnrolmentItems } from '../services/DataProvider';

interface EnroledCoursesContextProps {
	allEnroledCourses: CourseEnrolmentItems[];
	loadEnroledCourses: () => void;
}

export const EnroledCoursesContext = createContext<EnroledCoursesContextProps>({
	allEnroledCourses: [],
	loadEnroledCourses: () => {},
});

export const useEnroledCoursesContext = () => useContext(EnroledCoursesContext);

interface EnroledCoursesProviderProps {
	children: ReactNode;
}

export const EnroledCoursesProvider: FC<EnroledCoursesProviderProps> = ({
	children,
}) => {
	const [allEnroledCourses, setAllEnroledCourses] = useState<
		CourseEnrolmentItems[]
	>([]);

	const loadEnroledCourses = async () => {
		try {
			const res = await getEnroledCourseLists();
			if (res) {
				setAllEnroledCourses(res);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	useEffect(() => {
		loadEnroledCourses();
	}, []);

	return (
		<EnroledCoursesContext.Provider
			value={{
				allEnroledCourses,
				loadEnroledCourses,
			}}
		>
			{children}
		</EnroledCoursesContext.Provider>
	);
};
