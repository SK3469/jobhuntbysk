import { setCompaines, setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setCompaines(res.data.companies));  //jobs actually defind the jobslice `allJobs[]`
                }

            } catch (error) {
                console.log(error)
            }

        }
        fetchCompanies();
    }, []) //array dependencies..
}
export default useGetAllCompanies