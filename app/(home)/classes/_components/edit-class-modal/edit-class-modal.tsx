import {
  Alert,
  AlertDescription,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/";
import { IShift } from "@/types";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ClassFormValues } from "../../_schema/class-schema";

interface IEditClassModalProps {
  isModalOpen: boolean;
  isLoading: boolean;
  success?: string;
  error?: string;
  setIsModalOpen: (state: boolean) => void;
  form: UseFormReturn<ClassFormValues>;
  handleSubmit: (data: ClassFormValues) => void;
  shifts: IShift[];
  isShiftsLoading: boolean;
}

export default function EditClassModal({
  isModalOpen,
  isLoading,
  error,
  success,
  setIsModalOpen,
  form,
  handleSubmit,
  shifts,
  isShiftsLoading,
}: IEditClassModalProps) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="mt-2 flex gap-2 items-center justify-start">
                      <FormLabel>Class Name</FormLabel>
                    </div>

                    <FormControl>
                      <Input placeholder="Enter class name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="shift_id"
              render={({ field }) => (
                <FormItem className="space-y-2 sm:space-y-3">
                  <FormLabel className="text-base font-medium text-foreground">
                    Shift
                  </FormLabel>
                  <FormControl>
                    <div className="relative mt-2">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="w-full px-4 py-3  text-sm font-medium border border-input rounded-lg bg-background focus:outline-none focus:border-transparent focus:shadow transition-all duration-200">
                          <SelectValue
                            placeholder={`${
                              isShiftsLoading ? "Loading..." : "Select Shift"
                            }`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {shifts.map((shift) => (
                            <SelectItem key={shift._id} value={shift._id || ""}>
                              {shift.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm " />
                </FormItem>
              )}
            />

            {error && (
              <Alert variant="destructive">
                <AlertDescription>
                  {error || "Something went wrong"}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription className="text-green-600">
                  {success}
                </AlertDescription>
              </Alert>
            )}
            <div className="w-full flex justify-center gap-4">
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isDirty}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Class"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
