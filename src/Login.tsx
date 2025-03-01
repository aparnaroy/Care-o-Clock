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
                  <Fieldset.Content>
                    <Input
                      placeholder="Email"
                      name="email"
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
