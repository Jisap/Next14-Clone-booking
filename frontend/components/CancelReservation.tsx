"use client"

import { useRouter } from  'next/navigation'
import { Button } from './ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


const CancelReservation = ({reservation}: { reservation:any }) => {

  const router = useRouter();

  const deleteData = async (url: string) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    try {

      const res = await fetch(url, options);
      const data = await res.json();
      return data

    } catch (error) {
      console.log(error)
    }
  }

  const cancelReservation = (id: number) => {
    deleteData(`http://127.0.0.1:1337/api/reservations/${id}`);
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="md">Candel Reservation</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {/* dialog header */}
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* dialog footer */}
        <AlertDialogFooter>
          <AlertDialogCancel>Dimiss</AlertDialogCancel>
          <AlertDialogAction onClick={() => cancelReservation(reservation.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelReservation