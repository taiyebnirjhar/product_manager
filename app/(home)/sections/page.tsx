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
import { getErrorMessage } from "@/lib/utils";
import { useGetClassesQuery } from "@/redux/api/classes/classes.api";
import {
  useCreateSectionMutation,
  useDeleteSectionMutation,
  useGetSectionsQuery,
  useUpdateSectionMutation,
} from "@/redux/api/sections/sections.api";
import { IClass, ISection } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreateSectionModal from "./_components/create-section-modal/create-section-modal";
import EditSectionModal from "./_components/edit-section-modal/edit-section-modal";
import { SectionFormValues, SectionSchema } from "./_schema/section-schema";

export default function SectionsPage() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [sections, setSections] = useState<ISection[]>([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<ISection | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { data: classesData, isLoading: isClassesLoading } = useGetClassesQuery(
    {}
  );
  const {
    data,
    isLoading: isDataLoading,
    isFetching,
  } = useGetSectionsQuery({});

  const [createSection] = useCreateSectionMutation();
  const [updateSection] = useUpdateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();

  const form = useForm<SectionFormValues>({
    resolver: zodResolver(SectionSchema),
    defaultValues: {
      name: "",
      class_id: "",
    },
  });

  const handleCreateSection = async (data: SectionFormValues) => {
    try {
      setIsLoading(true);
      const response = await createSection({ data }).unwrap();
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

  const handleEditSection = async (data: SectionFormValues) => {
    if (!editingSection) return;
    try {
      setIsLoading(true);
      const response = await updateSection({
        id: editingSection._id,
        data,
      }).unwrap();
      if (response?.success) {
        setIsEditModalOpen(false);
        setEditingSection(null);
        form.reset();
      }
    } catch (err) {
      console.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    try {
      setIsLoading(true);
      await deleteSection({ id: sectionId }).unwrap();
    } catch (err) {
      console.error(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const openEditModal = (section: ISection) => {
    setEditingSection(section);
    form.setValue("name", section.name);
    form.setValue("class_id", section.class_id || "");
    setIsEditModalOpen(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (data?.sections) {
      setSections(data.sections);
    }
  }, [data]);

  useEffect(() => {
    if (classesData?.classes) {
      setClasses(classesData.classes);
    }
  }, [classesData]);

  console.log(classes);

  return (
    <PageContainer>
      <PageHeader name="Sections Management">
        <CreateSectionModal
          form={form}
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          handleSubmit={handleCreateSection}
          isLoading={isLoading}
          classes={classes}
          isClassesLoading={isClassesLoading}
        >
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Section
          </Button>
        </CreateSectionModal>
      </PageHeader>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground p-4">Shift</TableHead>
              <TableHead className="text-muted-foreground p-4">Class</TableHead>
              <TableHead className="text-muted-foreground p-4">
                Section
              </TableHead>
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
              sections.map((section) => (
                <TableRow key={section._id}>
                  <TableCell className="p-4 capitalize">
                    {section.shift_name}
                  </TableCell>
                  <TableCell className="p-4 capitalize">
                    {section.class_name}
                  </TableCell>
                  <TableCell className="font-medium p-4 capitalize">
                    {section.name}
                  </TableCell>
                  <TableCell className="p-4">
                    {formatDate(section.createdAt)}
                  </TableCell>
                  <TableCell className="p-4">
                    {formatDate(section.updatedAt)}
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
                          onClick={() => openEditModal(section)}
                        >
                          View & Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DeleteAlert
                          onConfirm={() => handleDeleteSection(section._id!)}
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

            {!isDataLoading && !isFetching && sections.length === 0 && (
              <TableRow className="h-24">
                <TableCell colSpan={6} className="text-center p-4 ">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <EditSectionModal
        form={form}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
        handleSubmit={handleEditSection}
        isLoading={isLoading}
        classes={classes}
        isClassesLoading={isClassesLoading}
      />
    </PageContainer>
  );
}
