import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import Popup from '../../Popup';
import { axios } from "../../../axios";
import './GetAllShowTime.scss';
import AddShowTime from './AddShowTime';
import EditShowTime from './EditShowTime';

function GetAllShowTime() {
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupEdit, setOpenPopupEdit] = useState(false);
    const [id, setId] = useState();

    const [showTimes, setShowTimes] = useState([]);

    const getData = () => {
        axios
            .get('/showtime')
            .then(res => {
                setShowTimes(res.data);

            })
            .catch(err => {
                console.log(err);
            })

    }

    const deleteData = (id) => {
        axios
        .delete(`showtime/${id}`)
        .then(function (res) {
            if (res.data.message === "Delete showtime successfully") {
                window.alert("Xóa thành công");
                getData();
            }
            else {
                window.alert("Xóa thất bại");
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }


    useEffect(() => {
        getData();

    }, []);

    const editShowTime = (id) => {
        setOpenPopupEdit(true);
        setId(id);
    }
    return (
        <div className='showTime-container'>
            <button className='btn-add' onClick={() => setOpenPopup(true)}><AddIcon />Add new</button>
            <table id="showtime">
                <tr>
                    <th width="7%" >Lịch chiếu</th>
                    <th width="7%">Tên suất chiếu</th>
                    <th width="7%">Trạng thái</th>
                    <th width="7%">Thời gian bắt đầu</th>
                    <th width="7%">Thời gian kết thúc</th>
                    <th width="7%" colSpan={2}>Hành động</th>
                </tr>
                {showTimes.map(item => {
                    return (
                        <tr key={item.id}>
                            <td>{item.maLichChieu}</td>
                            <td>{item.tenSuatChieu}</td>
                            <td>{item.trangThai}</td>
                            <td>{item.timeStart}</td>
                            <td>{item.timeEnd}</td>
                            <td><button className='btn-edit' onClick={() => editShowTime(item.id)}><i className='fas fa-pencil-alt' ></i></button></td>
                            <td><button className='btn-delete' onClick={(e) => deleteData(item.id)}><i className='fas fa-trash'></i></button></td>
                        </tr>
                    )
                })}
            </table>
            <Popup
                title="Add show time"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                handleReloadComponent={getData}
            >
                <AddShowTime></AddShowTime>
            </Popup>

            <Popup
                title="Edit show time"
                openPopup={openPopupEdit}
                setOpenPopup={setOpenPopupEdit}
                handleReloadComponent={getData}
            >
                <EditShowTime id={id}></EditShowTime>
            </Popup>

        </div>
    )
}

export default GetAllShowTime