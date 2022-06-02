import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import Schedule from './Schedule';
import './ListSchedule.scss';
import Popup from '../../../Popup'
import { getAllSchedule } from '../../../../Service/Staff_service';
import CreateSchedule from '../CreateSchedule/CreateSchedule';
export default function ListSchedule() {
    const [schedules, setSchedules] = useState([])
    const [openPopup, setOpenPopup] = useState(false)
    useEffect( () =>
        {
            async function fetchData()
            {
                let res = await getAllSchedule();
                setSchedules(res)
                console.log(res)
            }
            fetchData()
        },[] 
    )
    return (
        <>
            <button className='btn-add' onClick={() =>setOpenPopup(true)}><AddIcon/>Add new</button>
            <table id="positions">
                <tr>
                    <th width="15%" >ID </th>
                    <th  width="15%">Mã phòng</th>
                    <th  width="15%">Mã phim</th>
                    <th  width="15%">Ngày chiếu</th>
                    <th  width="15%">Trạng thái</th>
                    <th width="8%" colSpan={2}>Hành động</th>
                </tr>   
                {schedules.map(schedule =>(<tr> <Schedule schedule={schedule} /></tr>))}   
</table>
            <Popup
                title="Add position"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CreateSchedule openPopup = {openPopup}></CreateSchedule>
            </Popup>
            
        </>
    )
}