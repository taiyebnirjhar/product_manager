"use client";

import PageContainer from "@/components/shared/page-container/page-container";
import PageHeader from "@/components/shared/page-header/page-header";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/";
import { DeleteAlert } from "@/components/ui/alert-dialog/delete-alert";
import { formatDate, getErrorMessage } from "@/lib/utils";
import {
  useCreateClassMutation,
  useDeleteClassMutation,
  useGetClassesQuery,
  useUpdateClassMutation,
} from "@/redux/api/classes/classes.api";
import { useGetShiftsQuery } from "@/redux/api/shifts/shifts.api";
import { IClass, IShift } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreateClassModal from "./_components/create-class-modal/create-class-modal";
import EditClassModal from "./_components/edit-class-modal/edit-class-modal";
import { ClassFormValues, ClassSchema } from "./_schema/class-schema";

export default function ClassesPage() {
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<IClass | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading: isDataLoading, isFetching } = useGetClassesQuery({});
  const { data: shiftsData, isLoading: isShiftsLoading } = useGetShiftsQuery(
    {}
  );

  const [createClass] = useCreateClassMutation();
  const [updateClass] = useUpdateClassMutation();
  const [deleteClass] = useDeleteClassMutation();

  const form = useForm<ClassFormValues>({
    resolver: zodResolver(ClassSchema),
    defaultValues: {
      name: "",
      shift_id: "",
    },
  });

  const getShiftName = (shift_id: string) => {
    const shift = shifts.find((s) => s._id === shift_id);
    return shift ? shift.name : "Unknown Shift";
  };

  const handleCreateClass = async (data: ClassFormValues) => {
    try {
      setIsLoading(true);
      const payload = {
        name: data.name,
        shift_id: data.shift_id,
      };
      const response = await createClass({ data: payload }).unwrap();
      if (response?.success) {
        setIsCreateModalOpen(false);
        form.reset();
      }
    } catch (err) {
      console.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClass = async (data: ClassFormValues) => {
    if (!editingClass) return;

    try {
      setIsLoading(true);
      const response = await updateClass({
        id: editingClass._id,
        data: {
          name: data.name,
          shift_id: data.shift_id,
        },
      }).unwrap();

      if (response?.success) {
        setIsEditModalOpen(false);
        setEditingClass(null);
        form.reset();
      }
    } catch (err) {
      console.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClass = async (class_id: string) => {
    try {
      setIsLoading(true);
      await deleteClass({ id: class_id }).unwrap();
    } catch (err) {
      console.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (classItem: IClass) => {
    setEditingClass(classItem);
    form.setValue("name", classItem.name);
    form.setValue("shift_id", classItem.shift_id);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    if (data?.classes) {
      setClasses(data.classes);
    }
  }, [data]);

  useEffect(() => {
    if (shiftsData?.shifts) {
      setShifts(shiftsData.shifts);
    }
  }, [shiftsData]);

  return (
    <PageContainer className="">
      <PageHeader name="Classes Management">
        <CreateClassModal
          form={form}
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          handleSubmit={handleCreateClass}
          isLoading={isLoading}
          isShiftsLoading={isShiftsLoading}
          shifts={shifts}
        >
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Shift
          </Button>
        </CreateClassModal>
      </PageHeader>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground p-4">Shift</TableHead>
              <TableHead className="text-muted-foreground p-4">Class</TableHead>
              <TableHead className="text-muted-foreground p-4">
                Created At
              </TableHead>
              <TableHead className="text-muted-foreground p-4">
                Updated At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(isDataLoading || isFetching) &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="p-4">
                    <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell className="p-4">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell className="p-4">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  </TableCell>
                  <TableCell className="p-4">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  </TableCell>
                </TableRow>
              ))}

            {!isDataLoading &&
              !isFetching &&
              classes.map((classItem) => (
                <TableRow key={classItem._id} className="p-4">
                  <TableCell className="p-4">
                    {getShiftName(classItem.shift_id)}
                  </TableCell>
                  <TableCell className="font-medium p-4">
                    {classItem.name}
                  </TableCell>
                  <TableCell className="p-4">
                    {formatDate(classItem.createdAt)}
                  </TableCell>
                  <TableCell className="p-4">
                    {formatDate(classItem.updatedAt)}
                  </TableCell>
                  <TableCell className="text-center p-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 !cursor-pointer"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openEditModal(classItem)}
                        >
                          View & Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteAlert
                          onConfirm={() => handleDeleteClass(classItem._id!)}
                        >
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DeleteAlert>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}

            {!isDataLoading && !isFetching && classes.length === 0 && (
              <TableRow className="h-24">
                <TableCell colSpan={6} className="text-center p-4 ">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <EditClassModal
        form={form}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        handleSubmit={handleEditClass}
        isLoading={isLoading}
        shifts={shifts}
        isShiftsLoading={isShiftsLoading}
      />
    </PageContainer>
  );
}
