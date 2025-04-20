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

function MyStudentsPage() {
  const { userRoles } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userRoles.includes('SuperAdmin')) return;

    const fetchStudents = async () => {
      try {
        const response = await fetchWithAuth("https://localhost:7044/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        const mappedStudents = data.map((student: any) => ({
          ...student,
          role: student.role || "Student",
          level: student.level || "Beginner",
          hasBeginnerProgram: student.hasBeginnerProgram || false,
          hasAdvancedProgram: student.hasAdvancedProgram || false,
          hasOnlineProgram: student.hasOnlineProgram || false,
          isAdmin: student.isAdmin || false,
        }));
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

  const handlePermissionChange = async (
    studentId: string,
    field: keyof Student,
    value: boolean | string
  ) => {
    try {
      // Optimistic UI update
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === studentId ? { ...student, [field]: value } : student
        )
      );

      const response = await fetchWithAuth(
        `https://localhost:7044/api/admin/users/${studentId}/permissions`,
        {
          method: "PUT",
          body: JSON.stringify({ [field]: value }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update permissions");
      }
    } catch (err) {
      // Revert optimistic update
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student.id === studentId
            ? {
                ...student,
                [field]: !value,
              }
            : student
        )
      );
    }
  };

  // ... (keep the existing permission checks and loading/error states)

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
                  <Checkbox.Root variant="subtle" colorPalette={"blue"}
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
                  <Checkbox.Root variant="subtle" colorPalette={"blue"} 
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
                  <Checkbox.Root variant="subtle" colorPalette={"blue"} 
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
                  <Checkbox.Root variant="subtle" colorPalette={"blue"} 
                    checked={student.isAdmin}
                    onCheckedChange={(e) =>
                      handlePermissionChange(
                        student.id,
                        "isAdmin",
                        !!e.checked
                      )
                    }
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