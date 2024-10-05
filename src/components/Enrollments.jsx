"use client";
import React, { useState } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
// import { PlusIcon } from "./PlusIcon";
// import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { EyeIcon } from "./icons/EyeIcon";
import { enrollmentColumns, enrollmentStatusOptions } from "./tables/data";
import { capitalize } from "./tables/utils";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
// import { ExportExcelButton } from "../excelsheet/Sheet";
// import { VerticalDotsIcon } from "../icons/VerticalDotsIcon";
// import ConfirmDeleteModal from "../dashboard/ConfirmDeleteModal";
import { dummyEnrollments } from "./tables/dummy";
import { PlusIcon } from "lucide-react";
import { ReusableModal } from "./ReusableModal";
import AddNewEnrollment from "./Forms/AddNewEnrollment";
import UpdateEnrollment from "./Forms/UpdateEnrollment";
// import { useAsyncList } from "@react-stately/data";
const statusColorMap = {
  opened: "success",
  closed: "danger",
  // pending: "warning",
};

// window.innerWidth <= 768
//   ? ["name", "actions"]
//   : ["name", "gender", "registrationStatus", "actions"];
// Fetcher function for swr
//
const Enrollments = () => {
  const INITIAL_VISIBLE_COLUMNS = ["name", "status", "actions"];
  const router = useRouter();
  const fetcher = (...args) =>
    fetch(...args).then(async (res) => await res.json());
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [formType, setFormType] = useState("");
  // const [selectedKey, setSelectedKey] = React.useState(null);
  const [userToDelete, setUserToDelete] = React.useState(null);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [action, setAction] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  // const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isEnrollmentFormOpened, setEnrollmentFormStatus] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [deleting, setDeleting] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const hasSearchFilter = Boolean(filterValue);
  // const { mutate } = useSWRConfig();
  const { data, isLoading, error, mutate } = useSWR(
    `/api/others/enrollments`,

    fetcher,
    {
      keepPreviousData: true,
    }
  );

  const closeEnrollmentForm = () => {
    setEnrollmentFormStatus(false);
  };

  // yes i knoww but it won't happened! I think!
  const openEnrollmentForm = (form, data) => {
    if (form == "new") {
      setFormType("new");
    }
    if (form == "update") {
      setSelectedEnrollment(data);

      setFormType("update");
    }
    setEnrollmentFormStatus(true);
  };

  // console.log(selectedEnrollment);
  // console.log(selectedSubs);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return enrollmentColumns;

    return enrollmentColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  // simple filter function
  const filteredItems = React.useMemo(() => {
    // let filteredEnrollments = dummyEnrollments;
    // use this below when fetching from api!
    let filteredEnrollments = data !== undefined && !isLoading ? [...data] : [];

    if (hasSearchFilter) {
      filteredEnrollments = filteredEnrollments?.filter((enrollment) =>
        enrollment.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    // filter by status
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== enrollmentStatusOptions.length
    ) {
      filteredEnrollments = filteredEnrollments.filter((enrollment) =>
        Array.from(statusFilter).includes(enrollment.status.toLowerCase())
      );
    }
    // filter by subjects

    return filteredEnrollments;
    // include data later when fetching from api!
  }, [filterValue, statusFilter, data]);
  // rounds up pages or number of pages to the nearest integer value
  // const pages = Math.ceil(data?.length / rowsPerPage);
  const pages = React.useMemo(() => {
    // console.log(data?.count);
    // return Math.ceil(dummyEnrollments.length / rowsPerPage);
    return data?.length > 0 ? Math.ceil(data.length / rowsPerPage) : 0;

    // include data?.length later when fetching from api!
  }, [rowsPerPage, data?.length]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    // return filteredItems?.slice(start, end);
    return !isLoading && data ? filteredItems?.slice(start, end) : [];
  }, [page, filteredItems, rowsPerPage]);

  // const deleteStudent = async (userId) => {
  //   setDeleting(true);
  //   try {
  //     await fetch(`/api/others/students?id=${userId}`, {
  //       method: "DELETE",
  //     });

  //     await mutate(
  //       `/api/others/students?page=${page}&search=${filterValue}&limit=${rowsPerPage}`
  //     ),
  //       setDeleting(false);
  //   } catch (err) {
  //     console.log(err);
  //     setDeleting(false);
  //   }
  // };

  const renderCell = React.useCallback((enrollment, columnKey) => {
    const cellValue = enrollment[columnKey];
    // console.log(enrollment);
    // console.log(columnKey);

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", name: enrollment?.studentIdPrefix }}
            description={enrollment?.enrolllmentDate}
            name={enrollment?.enrollmentID}
          >
            {/* {enrollment.name} */}
          </User>
        );
      case "status":
        return (
          <Chip
            className=" border-none gap-1 text-default-600"
            color={statusColorMap[enrollment?.status?.toLowerCase()]}
            size="sm"
            variant="dot"
          >
            {enrollment?.status}
          </Chip>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <div>
              <Tooltip content="View">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  key={"view"}
                  onClick={() => openEnrollmentForm("update", enrollment)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
            </div>
            {/* <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip> */}
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                key={"delete"}
                // // onClick={() => deleteStudent(user?._id)}
                // onClick={() => {
                //   setUserToDelete(user);
                //   // this will open the confirm delete modal
                //   onOpen();
                // }}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    console.log(`page ${page} pages ${pages}`);
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
    // mutate();
  }, []);
  // console.log(rowsPerPage);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between flex-wrap gap-3 items-end">
          <Input
            size="sm"
            isClearable
            className="w-full sm:max-w-[44%] border-none outline-none"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3 flex-wrap">
            <Button
              color="success"
              variant="flat"
              endContent={<PlusIcon />}
              onPress={() => openEnrollmentForm("new", null)}
            >
              New Enrollment
            </Button>
            {/*  */}

            {/*  */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
                // className="dark"
              >
                {enrollmentStatusOptions.map((status) => (
                  <DropdownItem key={status?.uid} className="capitalize">
                    {capitalize(status?.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/*  */}

            {/*  */}

            <Dropdown>
              {/* className="hidden sm:flex" */}
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="bordered"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {enrollmentColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Button color="primary" endContent={<PlusIcon />}>
              Export Excel
            </Button> */}
            {/* <ExportExcelButton data={items} selectedSubs={selectedSubs} /> */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {data?.length} enrollments
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="100">200</option>
              <option value={data?.length}>All</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,

    visibleColumns,
    onRowsPerPageChange,
    data?.length,
    onSearchChange,
    hasSearchFilter,
  ]);
  // console.log(pages);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items?.length} selected`}
        </span> */}
        {pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null}
        {/* <Pagination
          isCompact
          showControls
          isDisabled={pages === 1}
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        /> */}
        {/* <div className="flex flex-wrap justify-end gap-2">
          <Button
            // isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            // isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div> */}
      </div>
    );
    // items.length,
  }, [selectedKeys, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        aria-label="Enrollments Table, pagination and sorting"
        isHeaderSticky
        color="primary"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px] sTable w-full",
        }}
        // selectedKeys={selectedKeys}
        selectionMode="single"
        // selectionBehavior="replace"
        topContent={topContent}
        topContentPlacement="outside"
        // onSelectionChange={(key) => updateSelectedKey(key)}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              // allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No users found"}
          items={items ?? []}
          // isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) =>
            item?.enrollmentID ? (
              <TableRow key={item?.enrollmentID}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            ) : null
          }
          {/* {(item) =>
            item?._id ? (
              <TableRow key={item?._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            ) : null
          } */}
        </TableBody>
      </Table>
      {/* <ConfirmDeleteModal
        isOpen={isOpen}
        // onClose={onClose}
        deleteStudent={deleteStudent}
        setUserToDelete={setUserToDelete}
        userToDelete={userToDelete}
        onOpenChange={onOpenChange}
        deleting={deleting}
      /> */}

      <ReusableModal
        isOpen={isEnrollmentFormOpened}
        closeModal={closeEnrollmentForm}
        modalTitle={"New Enrollment"}
      >
        {formType == "new" ? (
          <AddNewEnrollment closeModal={closeEnrollmentForm} />
        ) : (
          <UpdateEnrollment
            data={selectedEnrollment}
            mutate={mutate}
            closeModal={closeEnrollmentForm}
          />
        )}
      </ReusableModal>
    </>
  );
};
export default Enrollments;
