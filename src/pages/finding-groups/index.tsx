// ** React Imports
import { useState, ChangeEvent, useEffect, KeyboardEvent } from 'react'


// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import {  Card, Grid, InputAdornment, Pagination, TextField } from '@mui/material'
import CardGroup from 'src/views/finding-groups/CardGroup'
import { Magnify } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import withAuth from '../withAuth'
import { QueryGroupListModel } from 'src/models/query-models/QueryGroupListModel'
import { groupAPI } from 'src/api-client'
import { CommonResponse } from 'src/models/common/CommonResponse'
import { useToasts } from 'react-toast-notifications'
import { Group } from 'src/models/class'
import { GroupCard } from 'src/models/views/GroupCard'
import { MajorGroupCard } from 'src/models/views/MajorGroupCard'



const FindingGroupsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  const totalItems = 100
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [listGroup, setlistGroup] = useState<GroupCard[]>([])
  const [searchName, setSearchName] = useState<string>('');
  const [storeSearchName,setStoreSearchName] = useState<string>('');

  const router = useRouter();
  const addToast = useToasts();

  useEffect(() => {

    getListGroup()
  },[storeSearchName])



  const getListGroup = async () => {
    try {
      const payload : QueryGroupListModel = {
        name: storeSearchName,
        orderBy: '',
        page: 1,
        pageSize: 10,
        type: '',
        value: ''
      }

      await groupAPI
        .getListFindingGroup(payload)
        .then(res => {
          const data = new CommonResponse(res)
          addToast.addToast(data.message, { appearance: 'success' })

          const groups: Group[] = data.data
          const list : GroupCard[]  = groups.map(group => {

            const majors: MajorGroupCard [] | undefined = group.groupMajors?.map(major => {

              return {
                Id: major.majorId,
                Quantity: major.memberCount,
                Name: major.major?.name,
                ShortName: major.major?.shortName
              }
            })

            return {
              Id: group.id,
              Name: group.name,
              SchoolName: group.schoolName,
              ClassName: group.className,
              SubjectName: group.subjectName,
              MemberCount: group.memberCount,
              Major: majors,
              Avatar: group.avatar,
              Theme: group.theme
            }
          })
          setlistGroup(list)
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const handleClickSearch = () =>{
    setStoreSearchName(searchName);
  }

  const handleEnterSearch = (event: KeyboardEvent<HTMLInputElement>) => {

    if (event.key === 'Enter') { console.log(event.currentTarget.value)
      setStoreSearchName(searchName);
    }
  };

  const handleSearch = (event:ChangeEvent<HTMLInputElement>) =>{
    setSearchName(event.target.value)
  }


  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
    router.push(
      {
        pathname: `/finding-groups`,
        query: {
          page
        }
      },
      `/finding-groups?page=${page}`,
      { shallow: true }
    )
  }


  return (
    <Card sx={{padding: '15px'}}>

      <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, padding: '15px' }}
          onChange={handleSearch}
          onKeyDown={handleEnterSearch}
          value={searchName}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small'  onClick={handleClickSearch}/>
              </InputAdornment>
            )
          }}
        />

    <Grid container spacing={7}>
      {listGroup.map(index => (
        <Grid item xs={12} sm={6} md={4} key={index.Id}>
          <CardGroup groupCard = {index} />
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color='primary' />
      </Grid>
    </Grid>
    </Card>
  );
}

export default withAuth(FindingGroupsPage)
