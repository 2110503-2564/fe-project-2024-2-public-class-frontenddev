import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { BookingItem } from "../../../interface";

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems: []}

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<BookingItem>)=>{
            const existingIndex = state.bookItems.findIndex(
                (item) => item.camp === action.payload.camp && item.bookDate === action.payload.bookDate
            );

            if (existingIndex !== -1) {
                state.bookItems[existingIndex] = action.payload;
            } else {
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action:PayloadAction<BookingItem>)=>{
            const remainItems = state.bookItems.filter(obj => {
                return (((obj.nameLastname !== action.payload.nameLastname) ||
                (obj.tel !== action.payload.tel) ||
                (obj.camp !== action.payload.camp) ||
                (obj.bookDate !== action.payload.bookDate)))
            })
            state.bookItems = remainItems
        },
        updateBooking: (state, action:PayloadAction<BookingItem>)=>{
            const existingIndex = state.bookItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (existingIndex !== -1) {
                state.bookItems[existingIndex] = action.payload;
            }
        },
        clearBookings: (state) => {
            state.bookItems = [];
        }
    }
})

export const { addBooking, removeBooking, updateBooking, clearBookings } = bookSlice.actions
export default bookSlice.reducer