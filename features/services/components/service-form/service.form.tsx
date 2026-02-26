"use client"

import { ServiceSchema } from "./service.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceSchema } from "./service.schema"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useServicesStore } from "@/features/services/store/use-services"
import { Service } from "../../types/services"
import { v4 as uuidv4 } from 'uuid';

const LANGUAGES = [
  { key: "az" as const, label: "Azərbaycan", flag: "🇦🇿" },
  { key: "en" as const, label: "English", flag: "🇬🇧" },
  { key: "ru" as const, label: "Русский", flag: "🇷🇺" },
]

interface ServiceFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function ServiceForm({ onSuccess, onCancel }: ServiceFormProps) {
  const { createService } = useServicesStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = async (data: ServiceSchema) => {
    const service: Service = {
      name: {
        az: data.name.az,
        en: data.name.en,
        ru: data.name.ru,
      },
      description: {
        az: data.description.az,
        en: data.description.en,
        ru: data.description.ru,
      },
      _id: uuidv4(),
    };
    try {
      await createService(service);
      reset();
      onSuccess?.();
    } catch {
      // Error is handled by store; dialog stays open
    }
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add service</CardTitle>
        <CardDescription>
          Fill in the name and description for each language (AZ, EN, RU).
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-8">
          {/* Name section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground border-b pb-2">
              Name
            </h3>
            <div className="grid gap-4 sm:grid-cols-1">
              {LANGUAGES.map(({ key, label, flag }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={`name-${key}`} className="flex items-center gap-2">
                    <span>{flag}</span>
                    <span>{label}</span>
                  </Label>
                  <Input
                    id={`name-${key}`}
                    placeholder={`Service name in ${label}`}
                    {...register(`name.${key}`)}
                    className={cn(errors.name?.[key] && "border-destructive")}
                  />
                  {errors.name?.[key] && (
                    <p className="text-xs text-destructive">
                      {errors.name[key].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Description section */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground border-b pb-2">
              Description
            </h3>
            <div className="grid gap-4 sm:grid-cols-1">
              {LANGUAGES.map(({ key, label, flag }) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={`description-${key}`} className="flex items-center gap-2">
                    <span>{flag}</span>
                    <span>{label}</span>
                  </Label>
                  <textarea
                    id={`description-${key}`}
                    placeholder={`Description in ${label}`}
                    rows={3}
                    {...register(`description.${key}`)}
                    className={cn(
                      "flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 md:text-sm min-h-[80px] resize-y",
                      errors.description?.[key] && "border-destructive"
                    )}
                  />
                  {errors.description?.[key] && (
                    <p className="text-xs text-destructive">
                      {errors.description[key].message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Add service
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}