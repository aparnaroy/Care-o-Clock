import React, { useState } from "react";
import {
  Tabs,
  ChakraProvider,
  defaultSystem,
  Container,
  Field,
  Input,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

export function Login() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://care-o-clock.up.railway.app/api/login",
        {
          email,
          password,
        }
      );

      alert("Login successful! Token: " + response.data.token);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        // ✅ If it's an Axios error, check response data
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        // ✅ If it's a standard JS Error, use message
        errorMessage = error.message;
      }

      console.error("Login failed:", errorMessage);
      alert("Login failed: " + errorMessage);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://care-o-clock.up.railway.app/api/signup",
        {
          fullName,
          birthDate,
          emergencyName,
          emergencyPhone,
          medicalConditions,
          email,
          password,
        }
      );

      alert("Signup successful! Welcome, " + response.data.user.fullName);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong";

      if (axios.isAxiosError(error)) {
        // ✅ If it's an Axios error, check response data
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        // ✅ If it's a standard JS Error, use message
        errorMessage = error.message;
      }

      console.error("Signup failed:", errorMessage);
      alert("Signup failed: " + errorMessage);
    }
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <Container>
        <Tabs.Root variant="enclosed" maxW="md" fitted defaultValue={"signup"}>
          <Tabs.List>
            <Tabs.Trigger value="signup">SIGN UP</Tabs.Trigger>
            <Tabs.Trigger value="login">LOG IN</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="signup">
            <form onSubmit={handleSignup}>
              <Field.Root>
                <Field.Label>
                  Full Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="fullName"
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Field.ErrorText />
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  Date of Birth <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="birthDate"
                  type="date"
                  onChange={(e) => setBirthDate(e.target.value)}
                />
                <Field.ErrorText />
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  Emergency Contact Name <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="emergencyName"
                  type="text"
                  onChange={(e) => setEmergencyName(e.target.value)}
                />
                <Field.ErrorText />
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  Emergency Phone Number <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="emergencyPhone"
                  type="tel"
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                />
                <Field.ErrorText />
              </Field.Root>

              <Field.Root>
                <Field.Label>Medical Conditions</Field.Label>
                <Input
                  name="medicalConditions"
                  type="text"
                  onChange={(e) => setMedicalConditions(e.target.value)}
                />
                <Field.ErrorText />
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Field.ErrorText />
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  Create Password <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Field.ErrorText />
              </Field.Root>

              <Button type="submit" alignSelf="flex-start">
                Log In!
              </Button>
            </form>
          </Tabs.Content>

          <Tabs.Content value="login">
            <form onSubmit={handleLogin}>
              <Field.Root>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Field.ErrorText />
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  Password <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Field.ErrorText />
              </Field.Root>

              <Button type="submit" alignSelf="flex-start">
                Sign In!
              </Button>
            </form>
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </ChakraProvider>
  );
}
