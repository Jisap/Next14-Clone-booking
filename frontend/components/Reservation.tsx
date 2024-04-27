"use client"

import { useState, useEffect} from 'react';
import { cn } from "@/lib/utils"
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { format, isPast } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import AlertMessage from './AlertMessage';

const postData = async(url:string, data:object) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  try {
    
    const res = await fetch(url, options);
    const data = await res.json();
    return data;

  } catch (error) {
    console.log(error)
  }
}

const Reservation = ({
  reservations,
  room,
  isUserAuthenticated,
  userData
}:  {
  reservations:any;
  room:any;
  isUserAuthenticated:any;
  userData:any;
}) => {

  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [alertMessage, setAlertMessage] = useState<{
    message: string;
    type: 'error' | 'success' | null;
  } | null>(null);

  const formatDateForStrapi = (date:Date) => {
    return format(date, "yyyy-MM-dd")
  } 

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(null)
    },3000)

    return () => clearTimeout(timer)

  }, [ alertMessage ])

  const saveReservation = () => {
    if(!checkInDate || !checkOutDate) {
      setAlertMessage({
        message: "Please select check-in and check-out dates",
        type: "error"
      });
    }

    if(checkInDate?.getTime() === checkOutDate?.getTime()){
      return setAlertMessage({
        message: "Check-in and check-out dates cannot be the same",
        type: "error"
      })
    }

    //dummy data
    const data = {
      data: {
        firstname: 'Jhon',
        lastname: 'Doe',
        email: 'jhondoe@gmail.com',
        checkIn: checkInDate ? formatDateForStrapi(checkInDate) : null,
        checkOut: checkOutDate ? formatDateForStrapi(checkOutDate) : null,
        room: room.data.id
      }
    };

    // post booking data to server
    postData('http://127.0.0.1:1337/api/reservations', data)
  }
 
  return (
    <div>
      <div className='bg-tertiary h-[320px] mb-4'>
        {/* top */}
        <div className='bg-accent py-4 text-center relative mb-2'>
          <h4 className='text-xl text-white'>Book your room</h4>
          {/* triangle */}
          <div className='absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h-0
          border-l-[10px] border-l-transparent border-t-[8px] border-t-accent
          border-r-[10px] border-r-transparent'>

          </div>
        </div>
        <div className='flex flex-col gap-4 w-full py-6 px-8'>
          {/* check in */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"default"}
                size="md"
                className={cn(
                  "w-full flex justify-start text-left font-semibold",
                  !checkInDate && "text-secondary"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkInDate ? format(checkInDate, "PPP") : <span>Check in</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkInDate}
                onSelect={setCheckInDate}
                initialFocus
                disabled={isPast}
              />
            </PopoverContent>
          </Popover>

          {/* check out */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"default"}
                size="md"
                className={cn(
                  "w-full flex justify-start text-left font-semibold",
                  !checkOutDate && "text-secondary"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOutDate ? format(checkOutDate, "PPP") : <span>Check out</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOutDate}
                onSelect={setCheckOutDate}
                initialFocus
                disabled={isPast}
              />
            </PopoverContent>
          </Popover>

          {/* conditional rendering of the booking button based on an user authentication status*/}
          {isUserAuthenticated 
            ? <Button 
                onClick={() => saveReservation()}
                size="md"
              >
                  Book now
              </Button>
            : <LoginLink>
                <Button 
                  className='w-full'
                  size="md"
                >
                  Book now
                </Button>
            </LoginLink>
          }

        </div>
      </div>
    
    {alertMessage && <AlertMessage message={alertMessage.message} type={alertMessage.type} />}
    
    </div>
  );
};

export default Reservation