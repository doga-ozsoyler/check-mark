import React, { FC, useState } from "react";
import { Modal, Button, View, Input, Stack, Text } from "native-base";

const CountdownScreen: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View flex="1" alignItems="center" justifyContent="center">
      <Button onPress={() => setVisible(true)}>Open Modal</Button>
      <Modal isOpen={visible} onClose={() => setVisible(false)}>
        <Modal.Content backgroundColor="#2D3033">
          <Modal.Body>
            <Stack alignItems="center">
              <Text color="#fff" fontSize="lg" mb={4} bold>
                Enter A Number
              </Text>
              <Input
                w="270px"
                size="md"
                keyboardType="numeric"
                placeholder="39"
                mb={8}
              />
              <Button colorScheme="teal" w="70px" borderRadius="50">
                OK
              </Button>
              <Button colorScheme="teal" variant="link" borderRadius="50">
                Cancel
              </Button>
            </Stack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default CountdownScreen;
