"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/features/dashboard/components/logout-button";
import ServiceForm from "@/features/services/components/service-form/service.form";
import { Service } from "@/features/services/types/services";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n/locales";

interface DashboardContentProps {
  services: Service[];
}

export default function DashboardContent({ services }: DashboardContentProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const locale = useLocale() as Locale;

  const handleAddSuccess = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center border p-6 rounded-md mt-8">

        <h1>Dashboard</h1>
        <div className="flex items-center gap-2">

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Add Service</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <ServiceForm onSuccess={handleAddSuccess} onCancel={() => setOpen(false)} />
            </AlertDialogContent>
          </AlertDialog>
          <LogoutButton />

        </div>
      </div>
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service: Service) => (
          <div key={service._id} className="border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <h2>{service.name[locale as Locale]}</h2>
              <p>{service.description[locale as Locale]}</p>
              <div className="flex items-center gap-2">
                <Button variant="outline">Edit</Button>
                <Button variant="outline">Delete</Button>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}
