"use client";

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { IClass } from "@/types";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { SectionFormValues } from "../../_schema/section-schema";

interface Props {
  form: UseFormReturn<SectionFormValues>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleSubmit: (data: SectionFormValues) => void;
  isLoading: boolean;
  classes: IClass[];
  children: ReactNode;
  isClassesLoading: boolean;
}

export default function CreateSectionModal({
  form,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
  isLoading,
  classes,
  children,
  isClassesLoading,
}: Props) {
  console.log(classes);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Section</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="create-section-name">Section Name</Label>
            <Input
              id="create-section-name"
              {...form.register("name", {
                required: "Section name is required",
              })}
              placeholder="Enter section name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="create-section-class">Class</Label>
            <Select onValueChange={(value) => form.setValue("class_id", value)}>
              <SelectTrigger>
                <SelectValue
                  className="w-full fixed right-18"
                  placeholder={`${
                    isClassesLoading ? "Loading..." : "Select Class"
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                {classes.map((classItem) => (
                  <SelectItem key={classItem._id} value={classItem._id ?? ""}>
                    <div className="relative w-full space-x-3">
                      <Badge variant={"outline"} className="">
                        Class - {classItem.name}
                      </Badge>
                      <Badge variant={"outline"} className="">
                        Shift - {classItem.shift_name}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.class_id && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.class_id.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Section"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
