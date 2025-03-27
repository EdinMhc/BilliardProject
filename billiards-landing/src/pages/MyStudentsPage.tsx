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
        // Map the API data to our Student interface
        const mappedStudents = data.map((student: any) => ({
          ...student,
          role: student.role || "Student",
          level: student.level || "Beginner",
          hasBeginnerProgram: student.hasBeginnerProgram || false,
          hasAdvancedProgram: student.hasAdvancedProgram || false,
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
                [field]: !value, // Revert to previous value
              }
            : student
        )
      );
    }
  };

  if (!userRoles.includes('SuperAdmin')) {
    return (
      <Box p={4}>
        <Heading mb={4}>My Students</Heading>
        <Box color="red.500">You don't have permission to view this page</Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box p={4}>
        <Heading mb={4}>My Students</Heading>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Heading mb={4}>My Students</Heading>
        <Box color="red.500">{error}</Box>
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
                  <Checkbox.Root variant="subtle" colorPalette={"blue"}
                    checked={student.hasBeginnerProgram}
                    onCheckedChange={(e) =>
                      handlePermissionChange(
                        student.id,
                        "hasBeginnerProgram",
                        !!e.checked
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
                    onCheckedChange={(e) =>
                      handlePermissionChange(
                        student.id,
                        "hasAdvancedProgram",
                        !!e.checked
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
                    onCheckedChange={(e) =>
                      handlePermissionChange(
                        student.id,
                        "hasOnlineProgram",
                        !!e.checked
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