import { Flex, Text, Box, Heading, CheckboxGroup, CheckboxCard } from "@chakra-ui/react";
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
    >
      <Heading mb={8} textAlign="center">
        Choose Your Plan
      </Heading>

      <CheckboxGroup defaultValue={[]}>
        <Flex gap={6} flexWrap="wrap" justifyContent="center">
          {plans.map((plan) => (
            <CheckboxCard.Root key={plan.value} value={plan.value}>
              <CheckboxCard.HiddenInput />
              <CheckboxCard.Control bg="white"> {/* Set background to white */}
                <CheckboxCard.Content>
                  <CheckboxCard.Label fontSize="xl" fontWeight="bold">
                    {plan.title}
                  </CheckboxCard.Label>
                  <Text fontSize="lg" fontWeight="semibold" color="blue.600" mt={2}>
                    {plan.price}
                  </Text>
                  <Box mt={4}>
                    {plan.benefits.map((benefit, index) => (
                      <Text key={index} fontSize="sm" color="gray.600" mt={1}>
                        ✔️ {benefit}
                      </Text>
                    ))}
                  </Box>
                </CheckboxCard.Content>
                <CheckboxCard.Indicator />
              </CheckboxCard.Control>
            </CheckboxCard.Root>
          ))}
        </Flex>
      </CheckboxGroup>
    </Box>
  );
}

// Plans data
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