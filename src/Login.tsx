import React, { useState } from "react";
import {
  Tabs,
  ChakraProvider,
  defaultSystem,
  Container,
  Fieldset,
  Input,
  Button,
} from "@chakra-ui/react";

export function Login() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Add your login logic here (e.g., API call)

    if (username && password) {
      alert("user: " + username);
    } else {
      alert("no success");
    }
  };
  return (
    <ChakraProvider value={defaultSystem}>
      <div>
        <Container>
          <Tabs.Root variant="enclosed" maxW="md" fitted defaultValue={"login"}>
            <Tabs.List>
              <Tabs.Trigger value="login">LOG IN</Tabs.Trigger>
              <Tabs.Trigger value="signup">SIGN UP</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="login">
              <form onSubmit={handleLogin}>
                <Fieldset.Root size="lg" maxW="md">
                  <Input
                    placeholder="Full Name"
                    name="fullName"
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                  />

                  <Input
                    placeholder="Date of Birth"
                    name="birthDate"
                    type="date"
                    onChange={(e) => setBirthDate(e.target.value)}
                  />

                  <Input
                    placeholder="Emergency Contact Name"
                    name="emergencyName"
                    type="text"
                    onChange={(e) => setEmergencyName(e.target.value)}
                  />

                  <Input
                    placeholder="Emergency Phone Number"
                    name="emergencyPhone"
                    type="tel"
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                  />

                  <Input
                    placeholder="Date of Birth"
                    name="birthDate"
                    type="date"
                    onChange={(e) => setBirthDate(e.target.value)}
                  />

                  <Input
                    placeholder="Medical Conditions"
                    name="medicalConditions"
                    type="text"
                    onChange={(e) => setMedicalConditions(e.target.value)}
                  />

                  <Fieldset.Content>
                    <Input
                      placeholder="Email"
                      name="email"
                      type="email"
                      onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                      placeholder="Create Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Fieldset.Content>

                  <Button type="submit" alignSelf="flex-start">
                    Log In!
                  </Button>
                </Fieldset.Root>
              </form>
            </Tabs.Content>
            <Tabs.Content value="signup">
              <form onSubmit={handleLogin}>
                <Fieldset.Root size="lg" maxW="md">
                  <Fieldset.Content>
                    <Input
                      placeholder="Email"
                      name="username"
                      type="email"
                      onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                      placeholder="Password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Fieldset.Content>

                  <Button type="submit" alignSelf="flex-start">
                    Sign In!
                  </Button>
                </Fieldset.Root>
              </form>
            </Tabs.Content>
          </Tabs.Root>
        </Container>
      </div>
    </ChakraProvider>
  );
}
