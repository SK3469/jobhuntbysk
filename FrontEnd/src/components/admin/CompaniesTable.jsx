import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {

    const { companies,searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany]= useState(companies);
const navigate= useNavigate();
    useEffect(()=>{
const filteredCompany = companies.length >= 0  && companies.filter((company)=>{
    if(!searchCompanyByText){
        return true 
    };
    return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
});
setFilterCompany(filteredCompany)
    },[companies, searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                {/* Table BOdy */}
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr>
                                <TableCell>
                                    <Avatar className="w-7 h-7 ">
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-30 h-[50px]">
                                            <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className=' flex gap-2 items-center w-fit'>
                                                <Edit2 className='w-4' />
                                                Edit
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>

                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable