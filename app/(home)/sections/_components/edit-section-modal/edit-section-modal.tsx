"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { IClass } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { SectionFormValues } from "../../_schema/section-schema";

interface Props {
  form: UseFormReturn<SectionFormValues>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleSubmit: (data: SectionFormValues) => void;
  isLoading: boolean;
  classes: IClass[];
  isClassesLoading: boolean;
}

export default function EditSectionModal({
  form,
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
  isLoading,
  classes,
  isClassesLoading,
}: Props) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="edit-section-name">Section Name</Label>
            <Input
              id="edit-section-name"
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
            <Label htmlFor="edit-section-class">Class</Label>
            <Select
              value={form.watch("class_id")}
              onValueChange={(value) => form.setValue("class_id", value)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={`${
                    isClassesLoading ? "Loading..." : "Select Class"
                  }`}
                />
              </SelectTrigger>
              <SelectContent>
                {classes.map((classItem) => (
                  <SelectItem key={classItem._id} value={classItem._id ?? ""}>
                    {classItem.name}
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
              {isLoading ? "Updating..." : "Update Section"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
