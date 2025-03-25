"use client"
import deleteBooking from "@/libs/deleteBooking"
import getBooking from "@/libs/getBooking"
import { addBooking, removeBooking, updateBooking } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { MenuItem, Select, TextField } from "@mui/material"
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import updateBookingAPI from "@/libs/updateBooking"
import getCamps from "@/libs/getCamps"
import getBookings from "@/libs/getBookings"

export default function BookingList() {
    const bookItems = useAppSelector((state)=>state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    const [isEditing, setIsEditing] = useState(false);

    const [nameLastname, setNameLastname] = useState("")
    const [tel, setTel] = useState("")
    const [camp, setCamp] = useState("")
    const [bookDate, setBookDate] = useState<Dayjs | null>(null)

    const [campItems, setCampItems] = useState(new Map<string, string>())

    useEffect( () => {
      const fetchData = async ()=> {
        const response = await getCamps()
        const mapItems: Map<string, string> = new Map();
        response.data.map((campItem: CampItem) => {
          mapItems.set(campItem._id, campItem.name)
        })
        setCampItems(mapItems)
      }
      fetchData();
    }, [])

    const handleRemoveBooking = async (bookItem: BookingItem) => {
        try {
            await deleteBooking(bookItem._id);
            dispatch(removeBooking(bookItem))
        } catch (error) {
            console.error('Failed to delete booking:', error);
        }
    }

    const handleFetchData = async (bookItem: BookingItem) => {
        try {
            const response = await getBooking(bookItem._id)
            setNameLastname(response.data.nameLastname)
            setTel(response.data.tel)
            setCamp(response.data.camp)
        } catch (error) {
            console.error('Failed to fetch booking:', error);
        }
    }

    const handleUpdateData = async (bookItem: BookingItem) => {
        if(nameLastname && tel && camp && bookDate) {
            try {
                await updateBookingAPI(bookItem._id, {
                    nameLastname,
                    tel,
                    camp,
                    bookDate: bookDate.toDate()
                });

                const updatedBooking: BookingItem = {
                    ...bookItem,
                    nameLastname,
                    tel,
                    camp,
                    bookDate: bookDate.format('YYYY-MM-DD')
                };

                dispatch(updateBooking(updatedBooking));
                setIsEditing(false);
            } catch (error) {
                console.error('Failed to update booking:', error);
                alert('Failed to update booking');
            }
        } else {
            alert("Please fill in all required fields");
        }
    }

    return (
        <>
        {
            bookItems.length == 0? 'No Camp Booking' :
            bookItems.map((bookItem)=> (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookItem._id}>
                    <div className="texl-xl">{bookItem.campName}</div>
                    <div className="text-sm">Name-Lastname {bookItem.nameLastname}</div>
                    <div className="text-sm">Tel {bookItem.tel}</div>
                    <div className="text-sm">Date {bookItem.bookDate}</div>
                    <div className="flex flex-row gap-2 m-1">
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600
                        px-3 py-1 text-white shadow-sm" onClick={() => {setIsEditing(!isEditing); handleFetchData(bookItem);}}>
                            Edit Booking
                        </button>

                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600
                        px-3 py-1 text-white shadow-sm" onClick={() => handleRemoveBooking(bookItem)}>
                            Remove Booking
                        </button>
                    </div>

                    
                    {
                        isEditing ? 
                        <div className="items-center justify-center flex flex-col m-5 bg-white rounded-md p-5 w-[30%]">
                            <div className="flex flex-col gap-2 items-center m-2">
                                <TextField className="bg-white" label="Name-Lastname" value={nameLastname} onChange={(e) => setNameLastname(e.target.value)} />
                                <TextField className="bg-white" label="Telephone Number" value={tel} onChange={(e) => setTel(e.target.value)} />
                                <Select
                                    variant="standard"
                                    name="camp"
                                    id="camp"
                                    value={camp}
                                    onChange={(e) => setCamp(e.target.value)}
                                    className="h-[2em] w-[200px] bg-white"
                                >
                                    {Array.from(campItems.entries()).map(([key, value]) => (
                                        <MenuItem key={key} value={key}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker className="bg-white" value={bookDate} onChange={(newValue) => setBookDate(newValue)}/>
                                </LocalizationProvider>
                            </div>

                            <button
                                name="Book Campground"
                                onClick={() => handleUpdateData(bookItem)}
                                className="w-full max-w-xs rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-indigo-600 hover:to-sky-600 px-4 py-3 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
                            >
                                Submit
                            </button>
                        </div>
                        : null
                    }
                </div>
            ))
        }
        </>
    )
}
