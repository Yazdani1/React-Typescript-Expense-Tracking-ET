import React, { useState, useEffect } from "react";
import axios from "axios";

import { UserProfileDetails } from "../../services/DataProvider";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import UserListsCard from "./UserListsCard";

const UserListPagination = () => {
  const [page, setPage] = useState<number>(1);
  const [userList, setUserList] = useState<UserProfileDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchMoreUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/alluser?page=${page}`
      );
      const newUsers = response.data;
      setPage(page + 1);
      setUserList([...userList, ...newUsers]);
    } catch (error) {
      setError("Error fetching more users");
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      setIsLoading(true);
      fetchMoreUsers().finally(() => {
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    fetchMoreUsers();
  }, []);

  return (
    <AdminPageLayout>
      <div
        onScroll={handleScroll}
        style={{ height: "100vh", overflow: "auto" }}
      >
        {userList.map((user) => (
          <UserListsCard user={user} />
        ))}
        {isLoading && <div>Loading...</div>}
        {error && <div>{error}</div>}
      </div>
      <h1>{userList.length}</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </AdminPageLayout>
  );
};

export default UserListPagination;
