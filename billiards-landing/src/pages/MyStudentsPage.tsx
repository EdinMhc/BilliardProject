import { useState, useEffect } from "react";
import { Box, Heading, Checkbox, Spinner, Stack, For } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { useAuth } from "../components/Utilities/authContext";
import { fetchWithAuth } from "../components/Utilities/apiClient";

interface Student {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  level: string;
  hasBeginnerProgram: boolean;
  hasAdvancedProgram: boolean;
  hasOnlineProgram: boolean;
  isAdmin: boolean;
}

interface BillingPlan {
  id: string;
  userId: string;
  beginnerProgram: boolean;
  advancedProgram: boolean;
  onlineSchoolProgram: boolean;
}

function MyStudentsPage() {
  const { userRoles } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userRoles.includes('SuperAdmin')) return;
  
    const fetchStudents = async () => {
      try {
        const [usersResponse, billingPlansResponse, adminUsersResponse] = await Promise.all([
          fetchWithAuth("https://localhost:7044/api/admin/users"),
          fetchWithAuth("https://localhost:7044/api/admin/users/billingplans"),
          fetchWithAuth("https://localhost:7044/api/admin/users/roles")
        ]);
  
        if (!usersResponse.ok || !billingPlansResponse.ok || !adminUsersResponse.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const usersData = await usersResponse.json();
        const billingPlansData: BillingPlan[] = await billingPlansResponse.json();
        const adminUsersData = await adminUsersResponse.json();
  
        const mappedStudents = usersData.map((student: any) => {
          const userBillingPlan = billingPlansData.find(bp => bp.userId === student.id);
          const isAdmin = adminUsersData.some((adminUser: any) => {
            return adminUser.userId === student.id && adminUser.isAdmin;
          });
          
          return {
            ...student,
            role: student.role || "Student",
            level: student.level || "Beginner",
            hasBeginnerProgram: userBillingPlan ? userBillingPlan.beginnerProgram : false,
            hasAdvancedProgram: userBillingPlan ? userBillingPlan.advancedProgram : false,
            hasOnlineProgram: userBillingPlan ? userBillingPlan.onlineSchoolProgram : false,
            isAdmin: isAdmin,
          };
        });
  
        setStudents(mappedStudents);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudents();
  }, [userRoles]);

  const updateProgramStatus = async (userId: string, programType: string, enabled: boolean) => {
    try {
      let endpoint = "";
      switch (programType) {
        case "beginner":
          endpoint = `https://localhost:7044/api/billingplan/beginnerprogram?userId=${userId}&hasProgram=${enabled}`;
          break;
        case "advanced":
          endpoint = `https://localhost:7044/api/billingplan/advancedprogram?userId=${userId}&hasProgram=${enabled}`;
          break;
        case "online":
          endpoint = `https://localhost:7044/api/billingplan/onlineschoolprogram?userId=${userId}&hasProgram=${enabled}`;
          break;
        default:
          throw new Error("Invalid program type");
      }
  
      const response = await fetchWithAuth(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update ${programType} program status`);
      }
  
      return true;
    } catch (err) {
      console.error(`Error updating ${programType} program:`, err);
      return false;
    }
  };

  const handleProgramChange = async (
    studentId: string,
    programType: "beginner" | "advanced" | "online",
    currentStatus: boolean
  ) => {
    try {
      // Optimistic UI update
      setStudents(prevStudents =>
        prevStudents.map(student => {
          if (student.id === studentId) {
            const updatedStudent = {
              ...student,
              [`has${programType.charAt(0).toUpperCase() + programType.slice(1)}Program`]: !currentStatus
            };
  
            // If enabling advanced program, disable beginner program and vice versa
            if (programType === "beginner" && !currentStatus) {
              updatedStudent.hasAdvancedProgram = false;
            } else if (programType === "advanced" && !currentStatus) {
              updatedStudent.hasBeginnerProgram = false;
            }
  
            return updatedStudent;
          }
          return student;
        })
      );
  
      // Call API to update program status
      const success = await updateProgramStatus(studentId, programType, !currentStatus);
      
      if (!success) {
        throw new Error(`Failed to update ${programType} program`);
      }
  
      // If we enabled one program, disable the other (only for beginner/advanced)
      if ((programType === "beginner" && !currentStatus) || 
          (programType === "advanced" && !currentStatus)) {
        const otherProgramType = programType === "beginner" ? "advanced" : "beginner";
        await updateProgramStatus(studentId, otherProgramType, false);
      }
  
    } catch (err) {
      // Revert optimistic update on error
      setStudents(prevStudents =>
        prevStudents.map(student => {
          if (student.id === studentId) {
            return {
              ...student,
              [`has${programType.charAt(0).toUpperCase() + programType.slice(1)}Program`]: currentStatus
            };
          }
          return student;
        })
      );
    }
  };

  const handleAdminPermissionChange = async (studentId: string, shouldBeAdmin: boolean) => {
    try {
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === studentId ? { ...student, isAdmin: shouldBeAdmin } : student
        )
      );

      const response = await fetchWithAuth(
        `https://localhost:7044/api/admin/${studentId}/permissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: shouldBeAdmin.toString(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update admin permission");
      }
    } catch (err) {
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === studentId ? { ...student, isAdmin: !shouldBeAdmin } : student
        )
      );
      console.error("Error updating admin permission:", err);
    }
  };

  if (loading) {
    return (
      <Box p={4}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4} overflowX="auto">
      <Heading mb={4}>My Students</Heading>
      <Table.Root variant="outline" size="md">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Surname</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Level</Table.ColumnHeader>
            <Table.ColumnHeader>Beginner Program</Table.ColumnHeader>
            <Table.ColumnHeader>Advanced Program</Table.ColumnHeader>
            <Table.ColumnHeader>Online School Program</Table.ColumnHeader>
            <Table.ColumnHeader>Admin</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For each={students}>
            {(student) => (
              <Table.Row key={student.id}>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.surname}</Table.Cell>
                <Table.Cell>{student.email}</Table.Cell>
                <Table.Cell>{student.role}</Table.Cell>
                <Table.Cell>{student.level}</Table.Cell>
                <Table.Cell>
                  <Checkbox.Root
                    variant="subtle"
                    colorPalette="blue"
                    checked={student.hasBeginnerProgram}
                    onCheckedChange={() =>
                      handleProgramChange(
                        student.id,
                        "beginner",
                        student.hasBeginnerProgram
                      )
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.Cell>
                <Table.Cell>
                  <Checkbox.Root
                    variant="subtle"
                    colorPalette="blue"
                    checked={student.hasAdvancedProgram}
                    onCheckedChange={() =>
                      handleProgramChange(
                        student.id,
                        "advanced",
                        student.hasAdvancedProgram
                      )
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.Cell>
                <Table.Cell>
                  <Checkbox.Root
                    variant="subtle"
                    colorPalette="blue"
                    checked={student.hasOnlineProgram}
                    onCheckedChange={() =>
                      handleProgramChange(
                        student.id,
                        "online",
                        student.hasOnlineProgram
                      )
                    }
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.Cell>
                <Table.Cell>
                  <Checkbox.Root
                    variant="subtle"
                    colorPalette="blue"
                    checked={student.isAdmin}
                    onCheckedChange={(e) => {
                      const isChecked = !!e.checked;
                      handleAdminPermissionChange(student.id, isChecked);
                    }}
                  >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export default MyStudentsPage;