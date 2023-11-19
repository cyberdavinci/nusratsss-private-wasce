"use client";
import React from "react";

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
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { columns, statusOptions, subjectOptions } from "./data";
import { capitalize } from "./utils";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/navigation";
import { ExportExcelButton } from "../excelsheet/Sheet";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import ConfirmDeleteModal from "../dashboard/ConfirmDeleteModal";
// import { useAsyncList } from "@react-stately/data";
const statusColorMap = {
  complete: "success",
  incomplete: "warning",
  // pending: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "gender",
  "registrationStatus",
  "actions",
];
// Fetcher function for swr
//
const StudentsTable = () => {
  const router = useRouter();
  const fetcher = (...args) =>
    fetch(...args).then(async (res) => await res.json());
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  // const [selectedKey, setSelectedKey] = React.useState(null);
  // const [currentUserId, setCurrentUserId] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );

  const [action, setAction] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [selectedSubs, setSelectedSub] = React.useState("all");
  // const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "subjects",
    direction: "ascending",
  });
  const [deleting, setDeleting] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const hasSearchFilter = Boolean(filterValue);
  const { mutate } = useSWRConfig();
  const { data, isLoading, error } = useSWR(
    `/api/students?page=${page}&search=${filterValue}&limit=${rowsPerPage}`,

    fetcher,
    {
      keepPreviousData: true,
    }
  );
  // console.log(selectedSubs);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  // simple filter function
  const filteredItems = React.useMemo(() => {
    let filteredUsers = data !== undefined && !isLoading ? [...data] : [];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers?.filter(
        (user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.subjects?.includes(filterValue.toLowerCase())
      );
    }
    // filter by status
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status.toLowerCase())
      );
    }
    // filter by subjects
    if (
      selectedSubs !== "all" &&
      Array.from(selectedSubs).length !== subjectOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        user.subjects.some((item) =>
          Array.from(selectedSubs).includes(item.toLowerCase())
        )
      );
    }

    return filteredUsers;
  }, [data, filterValue, statusFilter, selectedSubs]);
  // rounds up pages or number of pages to the nearest integer value
  // const pages = Math.ceil(data?.length / rowsPerPage);
  const pages = React.useMemo(() => {
    // console.log(data?.count);
    return data?.length > 0 ? Math.ceil(data.length / rowsPerPage) : 0;
  }, [data?.length, rowsPerPage]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return !isLoading && data ? filteredItems?.slice(start, end) : [];
  }, [page, filteredItems, rowsPerPage]);

  // const updateSelectedKey = (key) => {
  //   setCurrentUserId(key["currentKey"]);
  //   // console.log(currentUserId);
  // };
  // console.log(currentUserId);
  const deleteStudent = async (userId) => {
    setDeleting(true);
    try {
      await fetch(`/api/students?id=${userId}`, {
        method: "DELETE",
      });

      await mutate(
        `/api/students?page=${page}&search=${filterValue}&limit=${rowsPerPage}`
      ),
        setDeleting(false);
    } catch (err) {
      console.log(err);
      setDeleting(false);
    }
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    // console.log(cellValue);
    // console.log(columnKey);

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", name: user.name[0]?.toUpperCase() }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "gender":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user?.gender ? user?.gender : "unspecified"}
            </p>
          </div>
        );
      case "registrationStatus":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user?.registrationStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "subjects":
        return (
          <ul>
            {user?.subjects?.map((subject, index) => (
              <li key={index}>-{subject}</li>
            ))}
          </ul>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <div>
              <Tooltip content="View">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  key={"view"}
                  onClick={() => router.push(`students/${user?._id}`)}
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
                // onClick={() => deleteStudent(user?._id)}
                onClick={() => {
                  setCurrentUser(user);
                  onOpen();
                }}
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
            isClearable
            className="w-full sm:max-w-[44%] border-none outline-none"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3 flex-wrap">
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
                {statusOptions.map((status) => (
                  <DropdownItem key={status?.uid} className="capitalize">
                    {capitalize(status?.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/*  */}
            <Dropdown
              classNames={{ base: "max-h-[300px]overflow-scroll" }}
              shouldBlockScroll={false}
            >
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="capitalize"
                  endContent={<ChevronDownIcon className="text-small" />}
                >
                  Subjects
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="h-[200px] overflow-y-scroll"
                classNames={{
                  base: "h-[200px] overflow-y-scroll",
                  list: "h-[200px] overflow-y-scroll",
                }}
                aria-label="Multiple selection example"
                variant="flat"
                closeOnSelect={false}
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedSubs}
                onSelectionChange={setSelectedSub}
              >
                {subjectOptions?.map((subject) => (
                  <DropdownItem key={subject?.uid} className="capitalize">
                    {capitalize(subject?.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Button color="primary" endContent={<PlusIcon />}>
              Export Excel
            </Button> */}
            <ExportExcelButton data={items} selectedSubs={selectedSubs} />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {data?.length} users
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
    selectedSubs,
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
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items?.length} selected`}
        </span>
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
        aria-label="Students Table, pagination and sorting"
        isHeaderSticky
        color="primary"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px] sTable",
        }}
        // selectedKeys={selectedKeys}
        // selectionMode="multiple"
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
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) =>
            item?._id ? (
              <TableRow key={item?._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            ) : null
          }
        </TableBody>
      </Table>
      <ConfirmDeleteModal
        isOpen={isOpen}
        // onClose={onClose}
        deleteStudent={deleteStudent}
        setCurrentUser={setCurrentUser}
        currentUser={currentUser}
        onOpenChange={onOpenChange}
        deleting={deleting}
      />
    </>
  );
};
export default StudentsTable;
