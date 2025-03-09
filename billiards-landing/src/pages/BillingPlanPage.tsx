import { HStack, RadioCard, Box, Text, Heading, Flex } from "@chakra-ui/react";

function BillingPlanPage() {
  return (
    <Box
      width="100%"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      bg="gray.50"
    >
      <Heading mb={8} textAlign="center" fontSize="3xl" fontWeight="bold" color="gray.800">
        Choose Your Plan
      </Heading>

      <RadioCard.Root defaultValue="beginner">
        <HStack align="stretch">
          {plans.map((item) => (
            <RadioCard.Item key={item.value} value={item.value} flex="1">
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl
                bg="white"
                p={6}
                borderRadius="lg"
                borderWidth="2px"
                borderColor="gray.200"
                _checked={{
                  borderColor: "blue.500",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
                _hover={{
                  borderColor: "blue.300",
                }}
                transition="all 0.2s"
                minW="300px"
              >
                <RadioCard.ItemContent>
                  <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
                    {item.title}
                  </Text>
                  <Text fontSize="lg" fontWeight="semibold" color="blue.600" mb={4}>
                    {item.price}
                  </Text>
                  <Flex direction="column" gap={2}>
                    {item.benefits.map((benefit, index) => (
                      <Text
                        key={index}
                        fontSize="sm"
                        color="gray.600"
                        p={2}
                        bg="gray.100"
                        borderRadius="md"
                        _hover={{
                          bg: "gray.200",
                          transform: "translateY(-2px)",
                        }}
                        transition="all 0.2s"
                      >
                        ✔️ {benefit}
                      </Text>
                    ))}
                  </Flex>
                </RadioCard.ItemContent>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </HStack>
      </RadioCard.Root>
    </Box>
  );
}

const plans = [
  {
    value: "beginner",
    title: "Beginner Program",
    price: "$40/month",
    benefits: [
      "4 live trainings",
      "Analyzing Plays",
      "2 private tutorials",
      "Recording of the sessions",
    ],
  },
  {
    value: "expert",
    title: "Expert Program",
    price: "$60/month",
    benefits: [
      "5 live trainings",
      "Analyzing Plays",
      "3 private tutorials",
      "Recording of the sessions",
    ],
  },
  {
    value: "online-school",
    title: "Online School",
    price: "$15/month",
    benefits: [
      "Analyzing Plays",
      "2 private tutorials",
    ],
  },
];

export default BillingPlanPage;