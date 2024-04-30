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
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelReservation